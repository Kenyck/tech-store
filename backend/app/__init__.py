from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    db.init_app(app)
    migrate.init_app(app, db)

    from app.routes.product_routes import product_blueprint
    from app.routes.auth_routes import auth_blueprint
    from app.routes.cart_routes import cart_blueprint

    app.register_blueprint(cart_blueprint, url_prefix='/api')
    app.register_blueprint(product_blueprint, url_prefix='/api')
    app.register_blueprint(auth_blueprint, url_prefix='/api')

    return app

__all__ = ["create_app", "db"]