/// <reference types="cypress"/>  

context('Funcionalidade login', () => {
   
    it('Deve fazer login com sucesso', () => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('#username').type('aluno_ebac@teste.com') //.type digitar
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click() // .click ele clica
        cy.get('.page-title').should('contain', 'Minha conta') //.should resultado esperado
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac (não é aluno_ebac?')

    });

    it('Deve exibir uma mensagem de erro ao inserir usuario inválido', () => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('#username').type('ebac@teste.com') //.type digitar
        cy.get('#password').type('teste@teste')
        cy.get('.woocommerce-form > .button').click() // .click ele clica
        cy.get('.woocommerce-error > li').should('contain', 'Endereço de e-mail desconhecido')
    });

    it('Deve ixibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('#username').type('aluno_ebac@teste.com') //.type digitar
        cy.get('#password').type('teste@teste')
        cy.get('.woocommerce-form > .button').click() // .click ele clica
        cy.get('.woocommerce-error > li').should('contain', 'Erro: A senha fornecida para o e-mail aluno_ebac@teste.com está incorreta. Perdeu a senha?')
        
    });
});