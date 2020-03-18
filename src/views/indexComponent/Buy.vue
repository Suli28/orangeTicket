<template>
  <div class="buy">
    <div class="buy-nav clearfix">
      <div class="fl location"></div>
      <div class="fl toggle">
        <div class="toggle-content">
          <router-link to="/movie">
            <div class="fl active">电影</div>
          </router-link>
          <router-link to="/cinema">
            <div class="fl">影院</div>
          </router-link>
        </div>
      </div>
      <!-- <div class="fl search">
        <span class="fr search-icon">
          <van-icon name="search" />
        </span>
      </div>-->
    </div>

    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "buy",
  data() {
    return {};
  },
  
};
</script>

<style lang="less" scoped>
.buy {
  padding: 0 10px;
  background-color: #fff;
  .location {
    width: 60px;
    height: 40px;
    line-height: 40px;
    color: #8798af;
    font-size: 14px;
  }

  .toggle {
    width: calc(~"100% - 120px");
    height: 40px;
    .toggle-content {
      width: 120px;
      margin: 0 auto;
      //background-color: #F9F9FB;
      text-align: center;
      border-radius: 12px;
      overflow: hidden;
      line-height: 24px;
      margin-top: 8px;
      font-size: 14px;
      font-weight: 600;
      div {
        width: 60px;
        height: 24px;
        color: #978866;
        .active {
          background-color: #fff;
          color: #ffbb10;
        }
      }
    }
  }
  .search {
    width: 60px;
    height: 40px;
    .search-icon {
      width: 20px;
      height: 20px;
      margin-top: 10px;
      font-size: 20px;
      color: #c9cedc;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {};
  }
};
</script>