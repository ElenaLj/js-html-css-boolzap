const app = new Vue({
    el: "#root",
    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received'
                }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent'
                }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
                }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                }
                ],
            },
        ],
        currentIndex: 0,
        messageIndex: 0,
        newInput: '',
        searchContact: '',
    },
    methods: {
        // questa funzione fa sì che al click il currentIndex si aggiorni e prenda l'indice dell'elemento selezionato  
        setActiveContact: function(index) {
            //console.log("selected index is ", index);
            this.currentIndex = index;
        },
        // questa funzione rende visibile all'utente l'elemento selezionato perché aggiunge la classe CSS active
        addActiveClass: function(index) {
            if(index == this.currentIndex) {
                return 'active';
            } 
        },
        // questa funzione distingue tra messaggi inviati (sent in verde) e ricevuti (received in bianco) aggiungengo la rispettiva classe CSS - in base al valore della chiave status degli oggetti in data
        addMessageClass: function(index) {
            if(this.contacts[this.currentIndex].messages[index].status == 'sent') {
                return 'sent';
            } else {
                return 'received';
            }
        },
        // questa funzione aggiunge un nuovo oggetto all'array messages in contacts con classe CSS sent, data e il messaggio inserito tramite nell'input grazie al v-model
        addNewMessage: function() {
            this.contacts[this.currentIndex].messages.push({
                date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                message: this.newInput,
                status: 'sent'
            });
            this.newInput = "";
        },
        // questa funzione fa partire una risposta automatica dopo 1s dall'invio di un nuovo messaggio - viene sollecitata dal tasto enter insieme alla f.ne addNewMessage sopra
        autoReply: function() {
            setTimeout( () => {
                this.contacts[this.currentIndex].messages.push({
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    message: 'Ok :)',
                    status: 'received'
                });
            },1000);  
        },
    },
    // questa computed property filtra l'array contacts alla ricerca di un riscontro tra le propietà name degli oggetti e la variabile searchContact (ovvero ciò che inserisce l'utente) 
    computed: {
        filteredNames: function() {
            return this.contacts.filter((contact) => {
                return contact.name.toLowerCase().match(this.searchContact);
            });
        }
    }
});