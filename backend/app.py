from app import create_app, db

app = create_app()  # Cria a instância do app já com o blueprint registrado

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Garante que as tabelas são criadas no banco de dados
    app.run(debug=True)