describe("Events queries", () => {
  it("In the US summer, order should be E1, E2, Aus", () => {
    cy.request({
      method: "GET",
      url: "/events",
      failOnStatusCode: false,
    }).then((response) => {
      console.log(response.body.map((event) => event.name))
      expect(response.status).to.equal(200)
      expect(response.body.map((event) => event.name)).to.deep.equal([
        "E1",
        "E2",
        "Mo-0845-Aus",
      ])
    })
  })
})
