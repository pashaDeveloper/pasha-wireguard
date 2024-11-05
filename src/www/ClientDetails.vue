<template>
  <div>
    <h1>جزئیات کاربر</h1>
    <div v-if="client">
      <h2>{{ client.name }}</h2>
      <p>محدودیت داده: {{ client.dataLimit }}</p>
      <p>تاریخ فعال‌سازی: {{ new Date(client.activatedAt).toLocaleString() }}</p>
      <img :src="qrcode" alt="QR Code" v-if="qrcode" />
    </div>
    <p v-else>در حال بارگذاری...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      client: null,
      qrcode: null,
    };
  },
  created() {
    this.fetchClientDetails();
  },
  methods: {
    async fetchClientDetails() {
      const clientId = this.$route.params.id; // دریافت شناسه کاربر از پارامترهای مسیر
      try {
        const response = await this.api.getClientDetails(clientId); // درخواست به API برای دریافت جزئیات کاربر
        this.client = response.data; // ذخیره اطلاعات کاربر
        this.qrcode = `./api/wireguard/client/${clientId}/qrcode.svg`; // تنظیم آدرس QR Code
      } catch (error) {
        console.error("خطا در دریافت جزئیات کاربر:", error);
      }
    },
  },
};
</script>

<style>
/* استایل‌های مربوط به صفحه جزئیات */
</style>
