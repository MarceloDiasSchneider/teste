app.component('register_user', {
    props: {
        codice_sessione: {
            type: String
        }
    },
    template:
        /*html*/
        `<!-- pagina originale pages/from/general.html | General form -->
        <!-- pagina originale pages/UI/modals.html | Toastr -->
        <div class="row">
            <div class="col-md-12">
                <!-- form registra utente -->
                <div class="card card-primary">
                    <div class="card-header">
                        <h3 class="card-title">Nuovo utente</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <!-- form start -->
                        <form action='#' id='user_form' name='user_form' method='post' @submit.prevent="insert_or_update_user">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="Nome">Nome</label>
                                            <input type="text" class="form-control" id="nome" name="nome" placeholder="Nome" maxlength="30" v-model="nome" required>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="Cognome">Cognome</label>
                                            <input type="text" class="form-control" id="cognome" name="cognome" placeholder="Cognome" maxlength="30" v-model="cognome">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="data-nascita">Data di nascita</label>
                                            <input type="date" class="form-control" id="data_nascita" name="data_nascita" placeholder="Data di nascita" v-model="data_nascita">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="codiceFiscale">Codice Fiscale</label>
                                            <input type="text" class="form-control" id="codice_fiscale" name="codice_fiscale" placeholder="Codice Fiscale" pattern="^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$" title="Codice fiscale errato." maxlength="16" v-model="codice_fiscale">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="telefono">Telefono</label>
                                            <input type="text" class="form-control" id="telefono" name="telefono" placeholder="Telefono" maxlength="16" v-model="telefono">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Livello</label>
                                            <select id="livello" name="livello" class="form-control" v-model.number="livello" required>
                                                <option disabled selected value="0">seleziona un livello</option>
                                                <option v-for="option in select_option" :value="option.id">{{ option.description }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="email">Email</label>
                                            <input type="email" class="form-control" id="email" name="email" placeholder="Email" maxlength="50" v-model="email" required>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="password">Password</label>
                                            <input type="password" class="form-control" id="password" name="password" placeholder="Password" pattern="[a-zA-Z0-9]{8,20}" title="Deve contenere più di 8 caratteri" v-model="password" :required="!user_id">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="verificaPassword">Verifica password</label>
                                            <input type="password" class="form-control" id="verificaPassword" name="verificaPassword" placeholder="Verifica password" pattern="[a-zA-Z0-9]{8,20}" title="Deve contenere più di 8 caratteri" v-model="verificaPassword" :required="!user_id">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input type="hidden" id="attivo" name="attivo" v-model="attivo">
                            <input v-if="user_id" type="hidden" id="id_utente" name="id_utente" :value="user_id">
                            <input type="hidden" id="codiceSessione" name="codiceSessione" :value="codice_sessione">
                            <!-- /.card-body -->
                            <button v-if="user_id" type="submit" id="insert" class="btn btn-primary" :disabled="desable_button">Aggiorna</button>
                            <button v-else type="submit" id="update" class="btn btn-primary" :disabled="desable_button">Registra</button>
                        
                            <button type="submit" id="reset_form" class="btn btn-primary" :class=" [user_id ? '' : 'd-none']" @click.prevent="reset_form">Indietro a nuovo utente</button>
                        </form>
                    </div>
                    <div class="card-footer">
                    </div>
                    <!-- TO DELETE -->
                    <div class="card-footer">
                        <button type="submit" id="edit" class="btn btn-primary" @click.prevent="get_user_data(1)">Edit 1</button>
                        <button type="submit" id="edit" class="btn btn-primary" @click.prevent="get_user_data(2)">Edit 2</button>
                        <button type="submit" id="edit" class="btn btn-primary" @click.prevent="console_log()">cnsl_lg</button>
                    </div>
                    <!-- TO DELETE -->
                </div>
                <!-- /.card -->
            </div>
            <!--/.form registra utente -->
        </div>
        <!-- /.row -->`,
    data() {
        return {
            // variable to eneble doble click
            desable_button: false,
            // variable to blid the form
            nome: null,
            cognome: null,
            data_nascita: null,
            codice_fiscale: null,
            telefono: null,
            livello: 0,
            email: null,
            password: null,
            verificaPassword: null,
            attivo: 1,
            // variable to hold the user id to toggle between new user or update user
            user_id: null,
            // variable to hold the select options
            select_option: [],
        }
    },
    methods: {
        // search all select option 
        select_options() {
            // set options to send with the post request
            const requestOptions = {
                method: 'POST',
                mode: 'same-origin',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ 'action': 'get_livelli' })
            }
            fetch('model.php', requestOptions)
                // process the backend response
                .then(async response => {
                    const data = await response.json()
                    switch (data.code) {
                        case '500':
                            // reporting an internal server error. ex: try catch
                            alert(data.state)
                            console.log(data.message)
                            break;
                        case '200':
                            // format the data to show the selct options
                            data.livelli.forEach(livello => {
                                this.select_option.push({ id: livello.id_livello, description: livello.descrizione })
                            });
                            break;
                        default:
                            break;
                    }
                })
                // report an error if there is
                .catch(error => {
                    this.errorMessage = error;
                    console.error('There was an error!', error);
                });
        },
        // register a new user
        insert_or_update_user() {
            this.desable_button = true
            let refresh = false
            // check if required inputs was fielded
            if (this.nome != '' && this.livello != 0 && this.email != '' && (this.password != '' && this.verificaPassword != '' || this.user_id)) {
                // set options to send with the post request
                const requestOptions = {
                    method: 'POST',
                    mode: 'same-origin',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({
                        'action': 'insert_or_update_user',
                        'nome': this.nome,
                        'cognome': this.cognome,
                        'data_nascita': this.data_nascita,
                        'codice_fiscale': this.codice_fiscale,
                        'telefono': this.telefono,
                        'livello': this.livello,
                        'email': this.email,
                        'password': this.password,
                        'verificaPassword': this.verificaPassword,
                        'attivo': this.attivo,
                        'user_id': this.user_id,
                    })
                }
                fetch('model.php', requestOptions)
                    // process the backend response
                    .then(async response => {
                        const data = await response.json()
                        switch (data.code) {
                            case '500':
                                // reporting an internal server error. ex: try catch
                                alert(data.state)
                                console.log(data.message)
                                break;
                            case '406':
                                // reporting a forbidden request. ex: session code doesn't match
                                alert(data.message)
                                document.location.href = '../autenticazione_VueJs';
                                break;
                            case '401':
                                // reporting an unauthorized error. ex: password dasen't match 
                                toastr.warning(data.message)
                                break;
                            case '400':
                                // repoting a bad request
                                toastr.error(data.message)
                                break;
                            case '201':
                                // reporting a success message
                                toastr.success(data.message)
                                this.$emit('refresh_datatables')
                                this.reset_form()
                                break;
                            case '200':
                                // reporting a success message
                                toastr.success(data.message)
                                this.$emit('refresh_datatables')
                                this.reset_form()
                                break;
                            default:
                                break;
                        }
                    })
                    // report an error if there is
                    .catch(error => {
                        this.errorMessage = error;
                        console.error('There was an error!', error);
                    });
            } else {
                // create a report to each field that must to be completed
                alert('compila tutti i campi')
            }
            this.desable_button = false
        },
        // get the user data to update
        get_user_data(user_id) {
            console.log(user_id)
            // set options to send with the post request
            const requestOptions = {
                method: 'POST',
                mode: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'action': 'get_user_data', 'id_utente': user_id })
            };
            fetch('model.php', requestOptions)
                // process the backend response
                .then(async response => {
                    const data = await response.json();
                    switch (data.code) {
                        case '500':
                            // reporting an internal server error. ex: try catch
                            alert(data.state)
                            console.log(data.message)
                            break;
                        case '200':
                            // reporting a success message
                            toastr.success(data.message)
                            // set the value to the imputs
                            this.user_id = user_id
                            if (data.user.nome != undefined) { this.nome = data.user.nome } else { this.nome = null }
                            if (data.user.cognome != undefined) { this.cognome = data.user.cognome } else { this.cognome = null }
                            if (data.user.data_nascita != undefined) { this.data_nascita = data.user.data_nascita } else { this.data_nascita = null }
                            if (data.user.codice_fiscale != undefined) { this.codice_fiscale = data.user.codice_fiscale } else { this.codice_fiscale = null }
                            if (data.user.telefono != undefined) { this.telefono = data.user.telefono } else { this.telefono = null }
                            if (data.user.id_livello != undefined) { this.livello = data.user.id_livello } else { this.livello = null }
                            if (data.user.email != undefined) { this.email = data.user.email } else { this.email = null }
                            break;
                        default:
                            break;
                    }
                })
                // report an error if there is
                .catch(error => {
                    this.errorMessage = error;
                    console.error('There was an error!', error);
                });
        },
        // reset the from values to null
        reset_form() {
            this.user_id = false
            this.nome = null
            this.cognome = null
            this.data_nascita = null
            this.codice_fiscale = null
            this.telefono = null
            this.livello = 0
            this.email = null
            this.password = null
            this.verificaPassword = null
        },
        // TO DELETE
        console_log() {
            console.log(this.nome);
            console.log(this.cognome);
            console.log(this.data_nascita);
            console.log(this.codice_fiscale);
            console.log(this.telefono);
            console.log(this.livello);
            console.log(this.email);
            console.log(this.password);
            console.log(this.verificaPassword);
        }
        // TO DELETE
    },
    beforeMount() {
        this.select_options()
    },
})