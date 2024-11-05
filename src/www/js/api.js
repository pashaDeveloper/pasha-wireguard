/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

'use strict';

class API {

  async call({ method, path, body }) {
    const res = await fetch(`./api${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
        ? JSON.stringify(body)
        : undefined,
    });

    if (res.status === 204) {
      return undefined;
    }

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error || res.statusText);
    }

    return json;
  }

  async getRelease() {
    return this.call({
      method: 'get',
      path: '/release',
    });
  }

  async getLang() {
    return this.call({
      method: 'get',
      path: '/lang',
    });
  }

  async getuiTrafficStats() {
    return this.call({
      method: 'get',
      path: '/ui-traffic-stats',
    });
  }

  async getChartType() {
    return this.call({
      method: 'get',
      path: '/ui-chart-type',
    });
  }

  async getSession() {
    return this.call({
      method: 'get',
      path: '/session',
    });
  }

  async createSession({ password }) {
    return this.call({
      method: 'post',
      path: '/session',
      body: { password },
    });
  }

  async deleteSession() {
    return this.call({
      method: 'delete',
      path: '/session',
    });
  }

  async getClients() {
    return this.call({
      method: 'get',
      path: '/wireguard/client',
    }).then((clients) => {
      const processedClients = clients.map((client) => {
        const toIranTime = (date) => {
          return new Intl.DateTimeFormat('fa-IR', {
            timeZone: 'Asia/Tehran',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }).format(new Date(date));
        };

        const activatedAtIran = client.activatedAt
          ? toIranTime(client.activatedAt)
          : null;

        // Console log for activatedAt in Iran time

        return {
          ...client,
          createdAt: client.createdAt,
          updatedAt: client.updatedAt,
          latestHandshakeAt: client.latestHandshakeAt !== null
            ? client.latestHandshakeAt
            : null,
          activatedAt: activatedAtIran,
          terrafic: client.dataLimit,
          expireDays: client.days,
          dataUsage: client.dataUsage,
          remainingDays: client.remainingDays,
        };
      });

      return processedClients;
    });
  }

  async createClient({ name, dataLimit, days }) {
    return this.call({
      method: 'post',
      path: '/wireguard/client',
      body: { name, dataLimit, days }, // اضافه کردن dataLimit و days
    });
  }

  async deleteClient({ clientId }) {
    return this.call({
      method: 'delete',
      path: `/wireguard/client/${clientId}`,
    });
  }

  async enableClient({ clientId }) {
    return this.call({
      method: 'post',
      path: `/wireguard/client/${clientId}/enable`,
    });
  }

  async disableClient({ clientId }) {
    return this.call({
      method: 'post',
      path: `/wireguard/client/${clientId}/disable`,
    });
  }

  async updateClientName({ clientId, name }) {
    return this.call({
      method: 'put',
      path: `/wireguard/client/${clientId}/name/`,
      body: { name },
    });
  }

  async updateClientAddress({ clientId, address }) {
    return this.call({
      method: 'put',
      path: `/wireguard/client/${clientId}/address/`,
      body: { address },
    });
  }

  async restoreConfiguration(file) {
    return this.call({
      method: 'put',
      path: '/wireguard/restore',
      body: { file },
    });
  }

  async getClientStats() {
    return this.call({
      method: 'get',
      path: '/wireguard/client/stats',
    });
  }

  async getClientDataUsage() {
    return this.call({
      method: 'get',
      path: '/wireguard/client/data-usage',
    });
  }

  async editClient({ clientId, data }) {
    return this.call({
      method: 'put',
      path: `/wireguard/client/${clientId}`,
      body: data,
    });
  }

  async resetClientUsage({ clientId }) {
    return this.call({
      method: 'post',
      path: `/wireguard/client/${clientId}/reset-usage`,
    });
  }

  async getClientDetails({ clientId }) {
    console.log('clientId', clientId);
    return this.call({
      method: 'get',
      path: `/wireguard/client/${clientId}/details`,
    });
  }

  async getClientQRCode({ clientId }) {
    return this.call({
      method: 'get',
      path: `/wireguard/client/${clientId}/qr-code`,
    });
  }

  async updateClient({
    clientId,
    clientEditName,
    clientEditDays,
    clientEditDataLimit,
  }) {
    return this.call({
      method: 'put',
      path: `/wireguard/client/${clientId}/update`,
      body: {
        clientEditName,
        clientEditDays,
        clientEditDataLimit,
      },
    });
  }

}
