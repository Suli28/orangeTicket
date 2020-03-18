<template>
  <div class="cinemaShow">
    <van-icon name="arrow-left" size="26px" color="#FF9E01" @click="back" />
    <div class="cinemaNameAddress">
      <div class="cinemaName">{{cinemaShowData.data.name}}</div>
      <div class="address">{{cinemaShowData.data.address}}</div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapMutations } = createNamespacedHelpers("cinemaShowModule");

export default {
  name: "cinemaShow",

  data() {
    return {};
  },
  computed: {
    ...mapState(["cinemaShowData"])
  },
  created() {
    this.$store.commit('resetState')
    let id = this.$route.params.id;
    console.log(id);
    this.$axios({
      method: "get",
      url: "/cinemas.movies?key=6254ef45cd588101694e17849df92c15&cinemaid=" + id
    })
      .then(result => {
        console.log(result);
        this.$store.commit(
          "cinemaShowModule/getCinemaShow",
          result.data.result.cinema_info
        );
      })
      .catch(error => console.log(error));
  },
  methods: {
      ...mapMutations('getCinemaShow','resetState'),
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.cinemaShow {
  padding: 10px;
  background: white;
  .cinemaName {
    line-height: 30px;
    background: white;
    height: 30px;
    //text-align: center;
    font-size: 20px;
    font-weight: 600;
    //width:80;
  }
  .address {
    font-size: 16px;
    color: #909090;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>