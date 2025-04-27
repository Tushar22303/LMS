from main_folder.app import create_app

app = create_app()

@app.route("/")
def home():
    return "<h1>Tushar Prajapati</h1>"

if __name__ == '__main__':
    app.run(debug=True, port=5000)