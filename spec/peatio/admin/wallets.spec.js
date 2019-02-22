/*
DONE:
  * Accessing page via UI (links integrity)
  * Number of signatures not empty
  * if Deposit => Maximum balance is 0
  * gateway client (client || bitgo)

TODO:
  * 
*/

//
//   describe('Testing Wallets Page', function () {
//     beforeEach(function () {
//       cy.fixture('peatio.json').then(peatio => {
//         cy.visit(peatio.host + 'admin/wallets')
//       })
//     })
//
//     it('Number of signatures not empty', function () {
//       cy.get('table.table-striped > tbody > tr').each(row => {
//         cy.visit(row[0].querySelector('td:nth-child(8) > a').href)
//
//         cy.contains('Number of signatures').next().then(signs => {
//           cy.wrap(signs[0].value).should('not.be.empty')
//         })
//       })
//     })
//
//     it('Maximum Balance 0 for Deposit', function () {
//       cy.get('table.table-striped > tbody > tr').each(row => {
//         cy.wrap(row[0].querySelector('td:nth-child(5)').innerText).then(kind => {
//           if (kind == 'Deposit') {
//             cy.visit(row[0].querySelector('td:nth-child(8) > a').href)
//
//             cy.contains('Maximum Balance').next().should('have.value', '0.0')
//           }
//         })
//       })
//     })
//
//     it('Gateway clients, Blockchain keys, URIs', function () {
//       cy.get('table.table-striped > tbody > tr').each(row => {
//         cy.wrap(row[0].querySelector('td:nth-child(2)')).then(currency => {
//           cy.visit(row[0].querySelector('td:nth-child(8) > a').href)
//
//           cy.fixture('currencies.json').then(currencies => {
//             var code = currency[0].innerText.trim()
//             var config = currencies[code]
//
//             cy.contains('Gateway Client').next().then(select => {
//               var option = select[0].selectedOptions[0].value
//               assert(option == "bitgo" || option == config.gateway, 'Gateway is correct')
//             })
//
//             cy.get('#wallet_blockchain_key').then(field => {
//               var regex = new RegExp('^' + config.blockchainKeyPrefix)
//               assert(regex.test(field[0].value), 'Blockchain Key is valid')
//             })
//           })
//         })
//       })
//     })
//   })
// })

describe("Wallet", () => {
  beforeEach(() => {
    cy.login();
    cy.visit('http://www.streamex.tech/wallets');
    Cypress.Cookies.preserveOnce('_peatio_session');
  });

  describe("Currencies", () => {
    // it('should open each wallet', function () {
    //   cy.get('ul.cr-wallet-list>li').each(function ($el, index) {
    //     cy.get(':nth-child(' + (index + 1) + ') > .cr-wallet-item').click();
    //   });
    // });
    //
    //
    // it('should have QR code', function () {
    //   const currencies = cy.request('GET', 'http://www.streamex.tech/api/v2/peatio/public/currencies');
    //   currencies.its('body').each((T) => {
    //     cy.wait(500);
    //     if (T.type === 'coin') {
    //       cy.get('.cr-wallet-list').contains(T.name).click();
    //       cy.get('.qr-code')
    //     }
    //   });
    // });

    it('should have deposit address', function () {
      const currencies = cy.request('GET', 'http://www.streamex.tech/api/v2/peatio/public/currencies');
      currencies.its('body').each((T) => {
        cy.wait(500);
        const address = cy.request('GET', 'http://www.streamex.tech/api/v2/peatio/account/deposit_address/bch').its('body').address;
        if (T.type === 'coin') {
          cy.wait(500);
          cy.get('.cr-wallet-list').contains(T.name).click();
          console.log(address);
          cy.get('#copy_deposit_1').then($input => {
            expect($input.val()).to.be.a('string');
            expect($input.val().length).to.equal(address.length);
          })
        }
      });
    });

    it('should have balance', function () {
      cy.get('ul.cr-wallet-list>li').each(function ($el, index) {
        cy.get(':nth-child(' + (index + 1) + ') > .cr-wallet-item').click();
        cy.get(':nth-child(' + (index + 1) + ') > .cr-wallet-item > .cr-wallet-item__balance').then($balance => {
          let balance_amount = parseFloat($balance.text());
          let balance_ok = false;
          if (balance_amount >= 0)
            balance_ok = true;
          expect(balance_ok).equals(true);
        });
      });
    });


  it('Accessing Wallets Page via UI', function () {
    cy.fixture('peatio.json').then(peatio => {
      cy.visit(peatio.host + 'settings');

      cy.get('.account-settings > .nav-link').click();

      cy.get('[href="/admin"]').click();

      cy.url().should('include', peatio.host + 'admin');

      cy.contains('.list-icon-item', 'Wallets').click();

      cy.url().should('include', '/wallets')
    })
  });

    it('should have working withdraw button and popout', function () {
      cy.get('ul.cr-wallet-list>li').each(function ($el, index, $list) {
        cy.get(':nth-child(' + (index + 1) + ') > .cr-wallet-item').click();
        cy.get('[tabindex="1"]').click();
        cy.get('.cr-button').click();
        cy.get('.cr-modal__container').contains("Confirmation");
        cy.get('.pg-exchange-modal-submit-footer__button-inverse').click();
        cy.get('.cr-button').click();
        cy.get('.pg-exchange-modal-submit-footer__button').click();
      });

    });
  });

  describe("Withdraw", () => {
    it('should withdraw', function () {
      cy.readFile("src/fixtures/currencies.json").then(currencies => {
        cy.wrap(currencies).each(T => {
          cy.get('.cr-wallet-list').contains(T.name).click();
          cy.get('[tabindex="1"]').click();
          cy.get(':nth-child(1) > .cr-input > input').type(T.address);
          cy.get(':nth-child(3) > .cr-input > input').type(T.amount);
          cy.get(':nth-child(3) > .cr-input > input').then((withdraw) => {
            cy.get(':nth-child(5) > .cr-summary-field-content').then((fees) => {
              let amount = T.amount - parseFloat(fees.text());
              cy.get(':nth-child(6) > .cr-summary-field-content').then((total) => {
                expect(parseFloat(total.text())).equals(amount);
              })
            })
          });
          cy.get('.cr-button').click();
          cy.get('.pg-exchange-modal-submit-footer__button').click()
        })
      });
    });
  });
});
