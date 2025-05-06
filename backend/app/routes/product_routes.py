from flask import Blueprint, request, jsonify
from flask_cors import CORS
from app.models import Product
from app import db
from app.auth_utils import token_required

product_blueprint = Blueprint('product', __name__)
CORS(product_blueprint)

# Criar novo produto (admin apenas)
@product_blueprint.route('/products', methods=['POST'])
@token_required(admin_only=True)
def add_product(current_user):
    data = request.get_json()
    try:
        new_product = Product(
            name=data['name'],
            price=data['price'],
            stock=data['stock']
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify({'message': 'Produto adicionado com sucesso!', 'product': new_product.name}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

# Obter lista de produtos (sem necessidade de autenticação)
@product_blueprint.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([
        {'id': p.id, 'name': p.name, 'price': p.price, 'stock': p.stock}
        for p in products
    ])

# Atualizar produto (admin apenas)
@product_blueprint.route('/products/<int:id>', methods=['PUT'])
@token_required(admin_only=True)
def update_product(current_user, id):
    data = request.get_json()
    product = Product.query.get(id)

    if product:
        product.name = data.get('name', product.name)
        product.price = data.get('price', product.price)
        product.stock = data.get('stock', product.stock)
        db.session.commit()
        return jsonify({'message': 'Produto atualizado com sucesso!'})

    return jsonify({'message': 'Produto não encontrado!'}), 404

# Remover produto (admin apenas)
@product_blueprint.route('/products/<int:id>', methods=['DELETE'])
@token_required(admin_only=True)
def delete_product(current_user, id):
    product = Product.query.get(id)

    if product:
        db.session.delete(product)
        db.session.commit()
        return jsonify({'message': 'Produto removido com sucesso!'})

    return jsonify({'message': 'Produto não encontrado!'}), 404