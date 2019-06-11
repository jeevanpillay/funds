"use strict";

const EasyGraphQLTester = require("easygraphql-tester");
const expect = require("chai").expect;
const { typeDefs } = require("../../../../schema");
const assert = require('chai').assert;

describe("Deposit GraphQL", () => {
  let tester;
  beforeEach(() => {
    tester = new EasyGraphQLTester(typeDefs);
  });

  afterEach(() => {
    tester.clearFixture();
  });

  describe("Query", () => {
    describe("getUserDeposits", () => {
        it("should be invalid if username is not passed", () => {
            const query = `{ 
                      getUserDeposits(address: "0x123") {
                          amount
                      }
                   }
                  `;
            tester.test(false, query);
          });
      
          it("should be invalid if address is not passed", () => {
            const query = `{ 
                      getUserDeposits(username: "Jack") {
                          amount
                      }
                   }
                  `;
            tester.test(false, query);
          });
      
          it("should be valid only if username and address is passed", () => {
            const query = `{ 
                      getUserDeposits(username: "Jack", address: "0x123") {
                          amount
                      }
                   }
                  `;
            tester.test(true, query);
          });
      
          it("should be invalid if there are extra arguments", () => {
            const query = `{ 
                      getUserDeposits(username: "Jack", address: "0x123", confirmation:"what?") {
                          amount
                      }
                   }
                  `;
            tester.test(false, query);
          });
      
          it("should be able to return some data", () => {
            const query = `
            query TEST($username: String!, $address: String!) {
              getUserDeposits(username: $username, address: $address) {
                  confirmations
                  time
                  address
              }
          }`;
      
            const variables = {
              username: "Jack123",
              address: "0x123"
            };
      
            const { data, errors } = tester.mock({
              query,
              variables,
              mockError: true
            });
      
            expect(data.getUserDeposits).to.exist;
          });
      
          it("should be able to return an array of entities", () => {
            const query = `
            query TEST($username: String!, $address: String!) {
              getUserDeposits(username: $username, address: $address) {
                  confirmations
                  time
                  address
              }
          }`;
      
            const variables = {
              username: "Jack123",
              address: "0x123"
            };
      
            const { data, errors } = tester.mock({
              query,
              variables,
              mockError: true
            });
      
            expect(data.getUserDeposits).to.be.an("array");
          });
      
          it("should ensure that deposits return values are valid", () => {
            const query = `
            query TEST($username: String!, $address: String!) {
              getUserDeposits(username: $username, address: $address) {
                  _id
                  confirmations
                  amount
              }
          }`;
      
            const variables = {
              username: "Jack123",
              address: "0x123"
            };
      
            const fixture = {
              data: {
                getUserDeposits: [
                  {
                    _id: "123",
                    confirmations: 0,
                    amount: 1000
                  },
                  {
                    _id: "123",
                    confirmations: 1,
                    amount: 112000
                  }
                ]
              }
            };
      
            tester.setFixture(fixture, { autoMock: false });
            const {
              data: { getUserDeposits }
            } = tester.mock({
              variables,
              query
            });
            tester.clearFixture();
      
            expect(getUserDeposits[0]._id).to.be.a("string");
            expect(getUserDeposits[0].amount).to.be.a("number");
            expect(getUserDeposits[0].confirmations).to.be.a("number");
          });
      
          it("should ensure that return value confirmation is correct", () => {
            const query = `
            query TEST($username: String!, $address: String!) {
              getUserDeposits(username: $username, address: $address) {
                  _id
                  confirmations
                  amount
              }
          }`;
      
            const variables = {
              username: "Jack123",
              address: "0x123"
            };
      
            const fixture = {
              data: {
                getUserDeposits: [
                  {
                    _id: "123",
                    confirmations: 0,
                    amount: 1000
                  },
                  {
                    _id: "123",
                    confirmations: 7,
                    amount: 112000
                  }
                ]
              }
            };
      
            tester.setFixture(fixture, { autoMock: false });
            const {
              data: { getUserDeposits }
            } = tester.mock({
              variables,
              query
            });
            tester.clearFixture();
      
            assert.equal(getUserDeposits[0].confirmations, 0);
            assert.equal(getUserDeposits[1].confirmations, 7);
          });
      
          it("should ensure that return value amount is correct", () => {
            const query = `
            query TEST($username: String!, $address: String!) {
              getUserDeposits(username: $username, address: $address) {
                  _id
                  confirmations
                  amount
              }
          }`;
      
            const variables = {
              username: "Jack123",
              address: "0x123"
            };
      
            const fixture = {
              data: {
                getUserDeposits: [
                  {
                    _id: "123",
                    confirmations: 0,
                    amount: 1000
                  },
                  {
                    _id: "123",
                    confirmations: 7,
                    amount: 112000
                  }
                ]
              }
            };
      
            tester.setFixture(fixture, { autoMock: false });
            const {
              data: { getUserDeposits }
            } = tester.mock({
              variables,
              query
            });
            tester.clearFixture();
      
            assert.equal(getUserDeposits[0].amount, 1000);
            assert.equal(getUserDeposits[1].amount, 112000);
          });
    })
  });
});
