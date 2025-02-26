from flask import Blueprint, request, jsonify
from flask_cors import CORS
from app.models import Product
from app import db

rotablue = Blueprint('rotablue', __name__)  # Nome do blueprint atualizado para 'rotablue'

# Aplica CORS apenas ao Blueprint
CORS(rotablue)

@rotablue.route('/products', methods=['POST'])
def add_product():
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

@rotablue.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{'id': p.id, 'name': p.name, 'price': p.price, 'stock': p.stock} for p in products])

@rotablue.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.get_json()
    product = Product.query.get(id)

    if product:
        product.name = data.get('name', product.name)
        product.price = data.get('price', product.price)
        product.stock = data.get('stock', product.stock)
        db.session.commit()
        return jsonify({'message': 'Produto atualizado com sucesso!'})
    
    return jsonify({'message': 'Produto não encontrado!'}), 404

@rotablue.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)

    if product:
        db.session.delete(product)
        db.session.commit()
        return jsonify({'message': 'Produto removido com sucesso!'})
    
    return jsonify({'message': 'Produto não encontrado!'}), 404