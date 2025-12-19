/// <reference types="cypress" />

describe('Конструктор бургеров - тесты по ТЗ', () => {
  
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { 
      fixture: 'ingredients.json' 
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait(1000);
  });

  afterEach(() => {
    cy.clearCookies();
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  describe('Добавление ингредиента из списка в конструктор', () => {
    it('Добавляет булку по кнопке "Добавить"', () => {
      cy.contains('Флюоресцентная булка R2-D3')
        .parents('li')
        .find('button:contains("Добавить")')
        .click();
      
      cy.get('body').should('contain', 'Флюоресцентная булка R2-D3');
    });

    it('Добавляет начинку по кнопке "Добавить"', () => {
      cy.contains('Флюоресцентная булка R2-D3')
        .parents('li')
        .find('button:contains("Добавить")')
        .click();
      
      cy.contains('Филе Люминесцентного тетраодонтимформа')
        .parents('li')
        .find('button:contains("Добавить")')
        .click();
      
      cy.get('body').should('contain', 'Филе Люминесцентного тетраодонтимформа');
    });

    it('Добавляет соус по кнопке "Добавить"', () => {
      cy.contains('Флюоресцентная булка R2-D3')
        .parents('li')
        .find('button:contains("Добавить")')
        .click();
      
      cy.contains('Соус Spicy-X')
        .parents('li')
        .find('button:contains("Добавить")')
        .click();
      
      cy.get('body').should('contain', 'Соус Spicy-X');
    });
  });

  describe('Работа модальных окон ингредиента', () => {
    it('Открывает модальное окно ингредиента при клике', () => {
      cy.contains('Краторная булка N-200i').click();
      
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="ingredient-details"]').should('be.visible');

      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('Закрывает модальное окно по клику на крестик', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.wait(1000);
      
      cy.get('[data-cy="modal-close"]').click();

      cy.get('[data-cy="modal"]').should('not.exist');
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('Закрывает модальное окно по клику на оверлей', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.wait(1000);

      cy.get('[data-cy="modal-overlay"]').click({ force: true });

      cy.get('[data-cy="modal"]').should('not.exist');
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/auth/user', { 
        fixture: 'user.json' 
      }).as('getUser');

      cy.intercept('POST', 'api/orders', { 
        fixture: 'order.json' 
      }).as('createOrder');

      cy.setCookie('accessToken', 'test-access-token');
      cy.window().then((win) => {
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
      });

      cy.reload();
      cy.wait('@getIngredients');
      cy.wait('@getUser');
      cy.wait(1000);
    });

    it('Создает заказ с правильным номером', () => {
      cy.contains('Флюоресцентная булка R2-D3')
        .parents('li')
        .find('button:contains("Добавить")')
        .click();
      
      cy.contains('Соус Spicy-X')
        .parents('li')
        .find('button:contains("Добавить")')
        .click();

      cy.get('body').should('contain', 'Флюоресцентная булка R2-D3');
      cy.get('body').should('contain', 'Соус Spicy-X');

      cy.contains('Оформить заказ').click();

      cy.wait('@createOrder');

      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="order-number"]').should('contain', '12345');

      cy.get('[data-cy="modal-close"]').click();

      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('[data-cy="burger-constructor"]').within(() => {
        cy.contains('Выберите булки').should('be.visible');
        cy.contains('Выберите начинку').should('be.visible');
      });
    });
  });
});

