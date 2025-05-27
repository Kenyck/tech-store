from flask import Blueprint, request, jsonify
from app import db
from app.models import CartItem, Product
from app.auth_utils import token_required

cart_blueprint = Blueprint('cart', __name__)

@cart_blueprint.route('/cart', methods=['GET'])
@token_required()
def get_cart_items(current_user):
    cart_items = CartItem.query.filter_by(user_id=current_user.id).all()
    items = []
    for item in cart_items:
        product = Product.query.get(item.product_id)
        items.append({
            "id": item.id,
            "product_id": item.product_id,
            "product_name": product.name if product else "Produto removido",
            "price": product.price if product else 0,
            "quantity": item.quantity
        })
    return jsonify(items), 200

@cart_blueprint.route('/cart', methods=['POST'])
@token_required()
def add_cart_item(current_user):
    data = request.get_json()
    product_id = data.get('product_id')

    try:
        quantity = int(data.get('quantity', 1))
    except (ValueError, TypeError):
        return jsonify({"message": "Quantidade inválida"}), 400

    existing = CartItem.query.filter_by(user_id=current_user.id, product_id=product_id).first()
    if existing:
        existing.quantity += quantity
    else:
        new_item = CartItem(
            user_id=current_user.id,
            product_id=product_id,
            quantity=quantity
        )
        db.session.add(new_item)

    db.session.commit()
    return jsonify({"message": "Item adicionado ao carrinho"}), 201

@cart_blueprint.route('/cart/<int:item_id>', methods=['PUT'])
@token_required()
def update_cart_item(current_user, item_id):
    data = request.get_json()
    quantity = data.get('quantity')
    
    item = CartItem.query.get(item_id)
    if not item or item.user_id != current_user.id:
        return jsonify({"message": "Item não encontrado"}), 404
    
    item.quantity = quantity
    db.session.commit()
    return jsonify({"message": "Item atualizado"}), 200

@cart_blueprint.route('/cart/<int:item_id>', methods=['DELETE'])
@token_required()
def delete_cart_item(current_user, item_id):
    item = CartItem.query.get(item_id)
    if not item or item.user_id != current_user.id:
        return jsonify({"message": "Item não encontrado"}), 404

    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Item removido do carrinho"}), 200

@cart_blueprint.route('/cart/clear', methods=['DELETE'])
@token_required()
def clear_cart(current_user):
    CartItem.query.filter_by(user_id=current_user.id).delete()
    db.session.commit()
    return jsonify({"message": "Carrinho limpo com sucesso"}), 200