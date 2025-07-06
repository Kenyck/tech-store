from flask import Blueprint, request, jsonify, current_app
from app.models import User
from app import db
import jwt
import datetime

auth_blueprint = Blueprint('auth', __name__)

# Rota de registro
@auth_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')
    is_admin = data.get('is_admin', False)

    if not username or not password:
        return jsonify({'message': 'Preencha todos os campos'}), 400

    if len(password) < 6:
        return jsonify({'message': 'A senha deve ter pelo menos 6 caracteres'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Nome de usuário já existe'}), 400

    user = User(username=username, is_admin=is_admin)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'Usuário criado com sucesso'}), 201

# Rota de login
@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Preencha usuário e senha'}), 400

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        try:
            token_payload = {
                'user_id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }

            token = jwt.encode(token_payload, current_app.config['SECRET_KEY'], algorithm='HS256')

            return jsonify({
                'message': 'Login bem-sucedido',
                'token': token,
                'isAdmin': user.is_admin,
                'username': user.username
            }), 200

        except Exception as e:
            return jsonify({'error': 'Erro ao gerar token'}), 500

    return jsonify({'error': 'Credenciais inválidas'}), 401

# Rota para verificar se o token ainda é válido
@auth_blueprint.route('/verify-token', methods=['GET'])
def verify_token():
    token = None

    if 'Authorization' in request.headers:
        bearer = request.headers['Authorization']
        if bearer.startswith('Bearer '):
            token = bearer.split(' ')[1]

    if not token:
        return jsonify({'error': 'Token não fornecido'}), 401

    try:
        decoded = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        user = User.query.get(decoded['user_id'])

        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404

        return jsonify({
            'message': 'Token válido',
            'username': user.username,
            'isAdmin': user.is_admin
        }), 200

    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token expirado'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Token inválido'}), 401