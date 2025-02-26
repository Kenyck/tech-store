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

    # Importa as rotas depois que o app foi criado
    from app.routes import rotablue
    app.register_blueprint(rotablue, url_prefix='/api')  # Registra com URL prefix

    return app