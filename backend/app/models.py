from app import db

class Product(db.Model):
    __tablename__ = 'product'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)  # Verifique se este campo existe

    def __init__(self, name, price, stock, description=None):
        self.name = name
        self.price = price
        self.stock = stock
        self.description = description