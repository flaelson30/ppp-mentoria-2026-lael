describe('API E2E Tests', () => {
  const admin = { username: 'admin', password: 'adminpass' };
  const seller = { username: 'seller', password: 'sellerpass' };
  let adminToken = null;
  let sellerToken = null;
  let deviceId = null;

  function unique(name) {
    return `${name}_${Date.now()}`;
  }

  it('CT01 - Login válido', () => {
    cy.request('POST', '/auth/login', admin).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
      adminToken = res.body.token;
    });
  });

  it('CT02 - Login inválido', () => {
    cy.request({ method: 'POST', url: '/auth/login', body: { username: 'x', password: 'y' }, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.equal(401);
    });
  });

  it('CT03 - Login sem campos obrigatórios', () => {
    cy.request({ method: 'POST', url: '/auth/login', body: { username: 'only' }, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.equal(400);
    });
  });

  it('CT04 - Listar usuários como admin', () => {
    cy.request({ method: 'GET', url: '/users', headers: { Authorization: `Bearer ${adminToken}` } }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

  it('CT05 - Listar usuários sem token', () => {
    cy.request({ method: 'GET', url: '/users', failOnStatusCode: false }).then((res) => {
      expect(res.status).to.equal(401);
    });
  });

  it('CT06 - Listar usuários como seller', () => {
    cy.request('POST', '/auth/login', seller).then((r) => {
      sellerToken = r.body.token;
      cy.request({ method: 'GET', url: '/users', headers: { Authorization: `Bearer ${sellerToken}` }, failOnStatusCode: false }).then((res) => {
        expect(res.status).to.equal(403);
      });
    });
  });

  it('CT07 - Criar admin válido', () => {
    const username = unique('admintest');
    cy.request({ method: 'POST', url: '/users/admin', headers: { Authorization: `Bearer ${adminToken}` }, body: { username, password: 'pass123' } }).then((res) => {
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('username', username);
    });
  });

  it('CT08 - Criar admin sem autenticação', () => {
    cy.request({ method: 'POST', url: '/users/admin', body: { username: unique('failadmin'), password: 'x' }, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.equal(401);
    });
  });

  it('CT09 - Criar admin como seller', () => {
    cy.request({ method: 'POST', url: '/users/admin', headers: { Authorization: `Bearer ${sellerToken}` }, body: { username: unique('failadmin2'), password: 'x' }, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.equal(403);
    });
  });

  it('CT10 - Criar admin com dados inválidos', () => {
    cy.request({ method: 'POST', url: '/users/admin', headers: { Authorization: `Bearer ${adminToken}` }, body: { username: '' }, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.equal(400);
    });
  });

  it('CT11 - Criar seller válido', () => {
    const username = unique('sellertest');
    cy.request({ method: 'POST', url: '/users/seller', headers: { Authorization: `Bearer ${adminToken}` }, body: { username, password: 'pass123' } }).then((res) => {
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('username', username);
    });
  });

  it('CT12 - Criar seller sem autenticação', () => {
    cy.request({ method: 'POST', url: '/users/seller', body: { username: unique('failseller'), password: 'x' }, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.equal(401);
    });
  });

  it('CT13 - Criar seller como seller', () => {
    cy.request({ method: 'POST', url: '/users/seller', headers: { Authorization: `Bearer ${sellerToken}` }, body: { username: unique('failseller2'), password: 'x' }, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.equal(403);
    });
  });

  it('CT14 - Criar seller com dados inválidos', () => {
    cy.request({ method: 'POST', url: '/users/seller', headers: { Authorization: `Bearer ${adminToken}` }, body: { username: '' }, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.equal(400);
    });
  });

  it('CT15 - Listar dispositivos autenticado', () => {
    cy.request({ method: 'GET', url: '/devices', headers: { Authorization: `Bearer ${adminToken}` } }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

  it('CT16 - Listar dispositivos sem token', () => {
    cy.request({ method: 'GET', url: '/devices', failOnStatusCode: false }).then((res) => {
      expect(res.status).to.equal(401);
    });
  });

  it('CT17 - Criar dispositivo válido', () => {
    const body = { nome: 'XPhone', marca: 'X', modelo: '1', sistema_operacional: 'XOS', numero_serie: 'SN123' };
    cy.request({ method: 'POST', url: '/devices', headers: { Authorization: `Bearer ${adminToken}` }, body }).then((res) => {
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('id');
      deviceId = res.body.id;
    });
  });

  it('CT18 - Criar dispositivo como seller', () => {
    const body = { nome: 'YPhone', marca: 'Y', modelo: '2', sistema_operacional: 'YOS', numero_serie: 'SN999' };
    cy.request({ method: 'POST', url: '/devices', headers: { Authorization: `Bearer ${sellerToken}` }, body, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.equal(403);
    });
  });

  it('CT19 - Criar dispositivo sem autenticação', () => {
    const body = { nome: 'NoAuth', marca: 'Z', modelo: '3', sistema_operacional: 'ZOS', numero_serie: 'SN000' };
    cy.request({ method: 'POST', url: '/devices', body, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.equal(401);
    });
  });

  it('CT20 - Criar dispositivo com dados inválidos', () => {
    cy.request({ method: 'POST', url: '/devices', headers: { Authorization: `Bearer ${adminToken}` }, body: { nome: '' }, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.equal(400);
    });
  });

  it('CT21 - Obter dispositivo existente', () => {
    cy.request({ method: 'GET', url: `/devices/${deviceId}`, headers: { Authorization: `Bearer ${adminToken}` } }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('id', deviceId);
    });
  });

  it('CT22 - Obter dispositivo inexistente', () => {
    cy.request({ method: 'GET', url: '/devices/not-found-id', headers: { Authorization: `Bearer ${adminToken}` }, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.equal(404);
    });
  });

  it('CT23 - Atualizar dispositivo válido', () => {
    const body = { nome: 'XPhone-updated', marca: 'X', modelo: '1', sistema_operacional: 'XOS', numero_serie: 'SN123' };
    cy.request({ method: 'PUT', url: `/devices/${deviceId}`, headers: { Authorization: `Bearer ${adminToken}` }, body }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('nome', 'XPhone-updated');
    });
  });

  it('CT24 - Atualizar dispositivo inexistente', () => {
    cy.request({ method: 'PUT', url: '/devices/not-found-id', headers: { Authorization: `Bearer ${adminToken}` }, body: { nome: 'x' }, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.equal(404);
    });
  });

  it('CT25 - Atualizar dispositivo como seller', () => {
    cy.request({ method: 'PUT', url: `/devices/${deviceId}`, headers: { Authorization: `Bearer ${sellerToken}` }, body: { nome: 'bad' }, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.equal(403);
    });
  });

  it('CT26 - Remover dispositivo existente', () => {
    cy.request({ method: 'DELETE', url: `/devices/${deviceId}`, headers: { Authorization: `Bearer ${adminToken}` } }).then((res) => {
      expect(res.status).to.equal(204);
    });
  });

  it('CT27 - Remover dispositivo inexistente', () => {
    cy.request({ method: 'DELETE', url: '/devices/not-found-id', headers: { Authorization: `Bearer ${adminToken}` }, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.equal(404);
    });
  });

  it('CT28 - Remover dispositivo como seller', () => {
    // create a device to attempt deletion
    cy.request({ method: 'POST', url: '/devices', headers: { Authorization: `Bearer ${adminToken}` }, body: { nome: 'Temp', marca: 'T', modelo: '1', sistema_operacional: 'TOS', numero_serie: 'SN-T' } }).then((res) => {
      const id = res.body.id;
      cy.request({ method: 'DELETE', url: `/devices/${id}`, headers: { Authorization: `Bearer ${sellerToken}` }, failOnStatusCode: false }).then((r) => {
        expect(r.status).to.equal(403);
      });
    });
  });
});
