describe("Orders", () => {
  beforeEach(() => {
    cy.login();
    cy.visit('http://www.streamex.tech/orders');
  });

  // describe("All", () => {
  //   it('should have correct order type', () => {
  //     cy.request('http://www.streamex.tech/api/v2/peatio/market/orders', { limit: 25, page: 1 })
  //         .then(response => {
  //           cy.wrap(response.body).each((T, i) => {
  //             expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(2)`)
  //                 .contains(`${T.side[0].toUpperCase()}${T.side.slice(1)} ${T.ord_type}`));
  //           })
  //         });
  //   });
  //
  //   it('should have correct pair', () => {
  //     cy.request('http://www.streamex.tech/api/v2/peatio/market/orders', { limit: 25, page: 1 })
  //         .then(response => {
  //           cy.wrap(response.body).each((T, i) => {
  //             expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(3)`)
  //                 .contains((`${T.market.slice(0, 3)}/${T.market.slice(3)}`).toUpperCase()));
  //           })
  //         });
  //   });
  //
  //   it('should have correct price', () => {
  //     cy.request('http://www.streamex.tech/api/v2/peatio/market/orders', { limit: 25, page: 1 })
  //         .then(response => {
  //           cy.wrap(response.body).each((T, i) => {
  //             expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(4)`)
  //             // after 2.1.50 .contains(T.ord_type === 'market' || T.state === 'done' ? T.avg_price : T.price));
  //                 .contains(T.price || T.avg_price));
  //           })
  //         });
  //   });
  //
  //   it('should have correct amount', () => {
  //     cy.request('http://www.streamex.tech/api/v2/peatio/market/orders', { limit: 25, page: 1 })
  //         .then(response => {
  //           cy.wrap(response.body).each((T, i) => {
  //             expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(5)`).contains(T.remaining_volume));
  //           })
  //         });
  //   });
  //
  //   it('should have correct executed volume', () => {
  //     cy.request('http://www.streamex.tech/api/v2/peatio/market/orders', { limit: 25, page: 1 })
  //         .then(response => {
  //           cy.wrap(response.body).each((T, i) => {
  //             expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(6)`).contains(T.executed_volume));
  //           })
  //         });
  //   });
  //
  //   it('should have correct remaining volume', () => {
  //     cy.request('http://www.streamex.tech/api/v2/peatio/market/orders', { limit: 25, page: 1 })
  //         .then(response => {
  //           cy.wrap(response.body).each((T, i) => {
  //             expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(7)`).contains(T.remaining_volume));
  //           })
  //         });
  //   });
  //
  //   it('should have correct cost remaining', () => {
  //     cy.request('http://www.streamex.tech/api/v2/peatio/market/orders', { limit: 25, page: 1 })
  //         .then(response => {
  //           cy.wrap(response.body).each((T, i) => {
  //             expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(8)`)
  //                 .contains((T.remaining_volume * T.price).toFixed(4)));
  //           })
  //         });
  //   });
  //
  //   it('should have correct status', () => {
  //     cy.request('http://www.streamex.tech/api/v2/peatio/market/orders', { limit: 25, page: 1 })
  //         .then(response => {
  //           cy.wrap(response.body).each((T, i) => {
  //             expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(9)`)
  //                 .contains(T.state === 'done' ? 'Executed' : T.state === 'cancel' ? 'Stopped' : 'Open'));
  //           })
  //         });
  //   });
  // });


  describe("Open", () => {
    beforeEach(() => {
      cy.get('[tabindex="1"]').click();
    });

    it('should have correct order type', () => {
      cy.request(Cypress.env.peatio + 'market/orders?limit=25&page=1&state=wait')
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(2)`)
                  .contains(`${T.side[0].toUpperCase()}${T.side.slice(1)} ${T.ord_type}`));
            })
          });
    });

    it('should have correct pair', () => {
      cy.request(Cypress.env.peatio + 'market/orders?limit=25&page=1&state=wait')
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(3)`)
                  .contains((`${T.market.slice(0, 3)}/${T.market.slice(3)}`).toUpperCase()));
            })
          });
    });

    it('should have correct price', () => {
      cy.request(Cypress.env.peatio + 'market/orders?limit=25&page=1&state=wait')
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(4)`)
              // after 2.1.50 .contains(T.ord_type === 'market' || T.state === 'done' ? T.avg_price : T.price));
                  .contains(T.price || T.avg_price));
            })
          });
    });

    it('should have correct amount', () => {
      cy.request(Cypress.env.peatio + 'market/orders?limit=25&page=1&state=wait')
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(5)`).contains(T.remaining_volume));
            })
          });
    });

    it('should have correct executed volume', () => {
      cy.request(Cypress.env.peatio + 'market/orders?limit=25&page=1&state=wait')
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(6)`).contains(T.executed_volume));
            })
          });
    });

    it('should have correct remaining volume', () => {
      cy.request(Cypress.env.peatio + 'market/orders?limit=25&page=1&state=wait')
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(7)`).contains(T.remaining_volume));
            })
          });
    });

    it('should have correct cost remaining', () => {
      cy.request(Cypress.env.peatio + 'market/orders?limit=25&page=1&state=wait')
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(8)`)
                  .contains((T.remaining_volume * T.price).toFixed(4)));
            })
          });
    });

    it('should have correct status', () => {
      cy.request(Cypress.env.peatio + 'market/orders?limit=25&page=1&state=wait')
          .then(response => {
            cy.wrap(response.body).each((T, i) => {
              expect(cy.get(`tr:nth-child(${i + 1}) > td:nth-child(9)`)
                  .contains(T.state === 'done' ? 'Executed' : T.state === 'cancel' ? 'Stopped' : 'Open'));
            })
          });
    });
  });
});
