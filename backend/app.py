from app import create_app, db
from flask_cors import CORS
from app.routes import rotablue  # Importa o blueprint 'rotablue'

app = create_app()

# Permite requisições de qualquer origem
CORS(app, resources={r"/*": {"origins": "*"}})

# Registra o blueprint com prefixo '/api'
app.register_blueprint(rotablue, url_prefix='/api')  # Usa 'rotablue' diretamente

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Garante que as tabelas são criadas
    app.run(debug=True)