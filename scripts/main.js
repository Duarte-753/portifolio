/*======================================= toggle navbar ===================================*/
let menuIcon = document.querySelector('#menu_icon');
let navBar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navBar.classList.toggle('active');
};

/*======================================= scroll section active link ===================================*/

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector(`header nav a[href*=${id}]`).classList.add('active');
            });
        }
    });

    /*======================================= sticky navbar ===================================*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*======================================= remove toggle icon and navbar ===================================*/
    menuIcon.classList.remove('fa-xmark');
    navBar.classList.remove('active');
};

/*======================================= scroll reveal ===================================*/
ScrollReveal({ 
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, heading', { origin: 'top'});
ScrollReveal().reveal('.home-img, .services-box, .portifolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-contact p, .about-contact', { origin: 'right' });

/*======================================= typed js ===================================*/
const typed = new Typed('.multiple-text', {
    strings: ['Desenvolvedor', 'Analista de Suporte', 'Youtuber'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
});

/*======================================= send email smtp.js ===================================*/


function emailSend(event) {
    event.preventDefault(); // Impede o envio do formulário padrão

    let userName = document.getElementById('name').value;
    let userEmail = document.getElementById('email').value;
    let userPhone = document.getElementById('phone').value;
    let userMessage = document.getElementById('mensagem').value;
    let userSubject = document.getElementById('subject').value;

    let messageBody = `
        Nome: ${userName} <br/>
        Telefone: ${userPhone} <br/>
        Email: ${userEmail} <br/>
        Assunto: ${userSubject} <br/>
        Mensagem do site Portfólio: ${userMessage}
    `;

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "julioduartebatista753@gmail.com",
        Password: "E1417025037A01E4DEFA15D28FF082EE3AC3",
        To: 'julioduartebatista753@gmail.com',
        From: "julioduartebatista753@gmail.com",
        Subject: "Site Portifólio",
        Body: messageBody,
    }).then(
        message => {
            if (message === 'OK') {
                swal("Mensagem enviada com sucesso!", "Pressione Ok", "success");
            } else {
                swal("Erro ao enviar o email", "Tente novamente!", "error");
            }
        }
    );
};

/*======================================= mask phone number ===================================*/

document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    const submitBtn = document.getElementById('submitBtn');
    const form = document.querySelector('form');

    phoneInput.addEventListener('input', function(e) {
        // Remove todos os caracteres não numéricos
        let value = e.target.value.replace(/\D/g, '');
        
        // Limita o comprimento a 11 caracteres (9 dígitos + 2 para o DDD)
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        
        // Aplica a máscara
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // Adiciona parênteses
        value = value.replace(/(\d{5})(\d)/g, '$1-$2'); // Adiciona o hífen
        
        // Atualiza o valor do campo
        e.target.value = value;
    });

    phoneInput.addEventListener('keydown', function(e) {
        // Permite apenas números e teclas de controle (backspace, delete, setas)
        const allowedKeys = [
            'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'
        ];
        
        if (allowedKeys.includes(e.key) || /^[0-9]$/.test(e.key)) {
            return;
        }
        
        e.preventDefault();
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita o envio padrão do formulário

        // Desabilita o botão de envio
        submitBtn.disabled = true;
         // Limpa os campos do formulário
        form.reset();
        submitBtn.value = "Enviando...";

        // Simula o envio com um atraso de 5 segundos (5000 ms)
        setTimeout(function() {
           
            

            // Reabilita o botão de envio após o atraso
            submitBtn.disabled = false;
            submitBtn.value = "Enviar Mensagem";
        }, 5000); // 5 segundos
    });
});



/*======================================= send email smtp.js ===================================*/



/*
function emailSend(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obtém os valores dos campos do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('mensagem').value;

    // Validações básicas
    if (!name || !email || !phone || !subject || !message) {
        swal("Erro", "Todos os campos são obrigatórios!", "error");
        return;
    }

    // Configuração do email
    const emailParams = {
        SecureToken: "2BEF0EED274117832C9AE82F2448EA9F9891", // Adicione seu token seguro do SMTPJS
        To: 'julioduartebatista753@gmail.com', // Adicione seu endereço de email aqui
        From: email,
        Subject: subject,
        Body: `
            Nome: ${name} <br>
            Email: ${email} <br>
            Telefone: ${phone} <br>
            Mensagem: <br> ${message}
        `
    };

    // Envio do email usando SMTPJS
    Email.send(emailParams).then(
        message => {
            if (message === 'OK') {
                swal("Sucesso", "Email enviado com sucesso!", "success");
                document.querySelector('form').reset(); // Limpa o formulário após o envio
            } else {
                swal("Erro", "Ocorreu um erro ao enviar o email. Tente novamente.", "error");
            }
        }
    ).catch(error => {
        console.error("Erro ao enviar email:", error);
        swal("Erro", "Ocorreu um erro ao enviar o email. Tente novamente.", "error");
    });
}
*/
