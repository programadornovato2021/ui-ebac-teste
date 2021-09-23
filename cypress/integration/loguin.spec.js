/// <reference types="cypress"/>  

context('Funcionalidade login', () => {
   const perfil = require('../fixtures/perfil.json')
    beforeEach(() => {
        cy.visit('minha-conta')
    });

    afterEach(() => {
        cy.screenshot()
    });
    it('Deve fazer login com sucesso', () => {
        
        cy.get('#username').type('aluno_ebac@teste.com') //.type digitar
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click() // .click ele clica
        cy.get('.page-title').should('contain', 'Minha conta') //.should resultado esperado
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac (não é aluno_ebac?')

    });

    it('Deve fazer login com sucesso - Usando arquivo de dados', () => {
        cy.get('#username').type(perfil.usuario) //.type digitar
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click() // .click ele clica
        cy.get('.page-title').should('contain', 'Minha conta') //.should resultado esperado
    });

    it.only('Deve fazer login com sucesso - Usando fixture', () => {
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario) //.type digitar
            cy.get('#password').type(dados.senha, {log: false})
            cy.get('.woocommerce-form > .button').click() // .click ele clica
            cy.get('.page-title').should('contain', 'Minha conta') //.should resultado esperado
        })
    });

    it('Deve exibir uma mensagem de erro ao inserir usuario inválido', () => {
      
        cy.get('#username').type('ebac@teste.com') //.type digitar
        cy.get('#password').type('teste@teste')
        cy.get('.woocommerce-form > .button').click() // .click ele clica
        cy.get('.woocommerce-error > li').should('contain', 'Endereço de e-mail desconhecido')
    });

    it('Deve ixibir uma mensagem de erro ao inserir senha inválida', () => {
       
        cy.get('#username').type('aluno_ebac@teste.com') //.type digitar
        cy.get('#password').type('teste@teste')
        cy.get('.woocommerce-form > .button').click() // .click ele clica
        cy.get('.woocommerce-error > li').should('contain', 'Erro: A senha fornecida para o e-mail aluno_ebac@teste.com está incorreta. Perdeu a senha?')
        
    });
});