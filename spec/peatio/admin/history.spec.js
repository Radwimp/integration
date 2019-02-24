describe("History", () => {
  beforeEach(() => {
    cy.login();
    cy.visit('http://www.streamex.tech/history');
  });

  describe("Deposit History", () => {
    it('should have correct txID', () => {
      cy.request('http://www.streamex.tech/api/v2/peatio/account/deposits', { limit: 25, page: 1 })
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              T.txid !== null ? expect(cy.get(`tr:nth-child(${i + 1}) > td:first`).contains(T.txid)) : null;
            })
          });
    });

    it('should have correct currency', () => {
      cy.request('http://www.streamex.tech/api/v2/peatio/account/deposits', { limit: 25, page: 1 })
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(3)`).contains(T.currency.toUpperCase()));
            })
          });
    });

    it('should have correct amount', () => {
      cy.request('http://www.streamex.tech/api/v2/peatio/account/deposits', { limit: 25, page: 1 })
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(4)`).contains(T.amount));
            })
          });
    });

    it('should have correct status', () => {
      cy.request('http://www.streamex.tech/api/v2/peatio/account/deposits', { limit: 25, page: 1 })
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:last`)
                  .contains(`${T.state[0].toUpperCase()}${T.state.slice(1)}`));
            })
          });
    });
  });


  describe("Withdraw History", () => {
    beforeEach(() => {
      cy.get('[tabindex="1"]').click();
    });

    it('should have correct address', () => {
      cy.request('http://www.streamex.tech/api/v2/peatio/account/withdraws', { limit: 25, page: 1 })
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:first`).contains(T.rid));
            })
          });
    });

    it('should have correct currency', () => {
      cy.request('http://www.streamex.tech/api/v2/peatio/account/withdraws', { limit: 25, page: 1 })
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(3)`).contains(T.currency.toUpperCase()));
            })
          });
    });

    it('should have correct amount', () => {
      cy.request('http://www.streamex.tech/api/v2/peatio/account/withdraws', { limit: 25, page: 1 })
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(4)`).contains(T.amount));
            })
          });
    });

    it('should have correct status', () => {
      cy.request('http://www.streamex.tech/api/v2/peatio/account/withdraws', {limit: 25, page: 1})
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:last`)
                  .contains(`${T.state[0].toUpperCase()}${T.state.slice(1)}`));
            })
          });
      });
    });


  describe("Trades History", () => {
    beforeEach(() => {
      cy.get('[tabindex="2"]').click();
    });

    it('should have correct side', () => {
      cy.request('http://www.streamex.tech/api/v2/peatio/market/trades', { limit: 25, page: 1 })
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(2)`)
                  .contains(T.side === 'ask' ? 'Sell' : 'Buy'));
            })
          });
    });

    it('should have correct market', () => {
      cy.request('http://www.streamex.tech/api/v2/peatio/market/trades', { limit: 25, page: 1 })
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(3)`)
                  .contains((`${T.market.slice(0, 3)}/${T.market.slice(3)}`).toUpperCase()));
            })
          });
    });

    it('should have correct price', () => {
      cy.request('http://www.streamex.tech/api/v2/peatio/market/trades', { limit: 25, page: 1 })
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(4)`).contains(T.price));
            })
          });
    });

    it('should have correct amount', () => {
      cy.request('http://www.streamex.tech/api/v2/peatio/market/trades', { limit: 25, page: 1 })
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(5)`).contains(T.volume));
            })
          });
    });

    it('should have correct funds', () => {
      cy.request('http://www.streamex.tech/api/v2/peatio/market/trades', { limit: 25, page: 1 })
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(6)`).contains(T.funds));
            })
          });
    });
  });
});
