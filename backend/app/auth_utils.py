from functools import wraps
from flask import request, jsonify, current_app
import jwt
from app.models import User

def token_required(admin_only=False):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = None

            if 'Authorization' in request.headers:
                bearer = request.headers['Authorization']
                if bearer.startswith('Bearer '):
                    token = bearer.split(' ')[1]

            if not token:
                return jsonify({'error': 'Token de autenticação ausente'}), 401

            try:
                data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
                current_user = User.query.get(data['user_id'])

                if not current_user:
                    return jsonify({'error': 'Usuário não encontrado'}), 404

                if admin_only and not current_user.is_admin:
                    return jsonify({'error': 'Acesso restrito a administradores'}), 403

            except jwt.ExpiredSignatureError:
                return jsonify({'error': 'Token expirado'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'error': 'Token inválido'}), 401

            return f(current_user, *args, **kwargs)

        return decorated
    return decorator