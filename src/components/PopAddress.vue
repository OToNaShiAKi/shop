<template>
  <div>
    <van-popup v-model="showList" position="bottom">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :switchable="switchable"
        default-tag-text="默认"
        @add="editAddress"
        @edit="editAddress"
        @select="select"
      />
    </van-popup>
    <van-popup v-model="showEdit" position="bottom">
      <van-address-edit
        show-postal
        show-set-default
        :area-list="area"
        :show-delete="delButton"
        :detail-rows="2"
        :tel-validator="rule"
        @save="save"
        @delete="delAddress"
        :address-info="addressInfo"
      />
    </van-popup>
  </div>
</template>

<script>
import { GetUserAddress } from "@/configs/serve";
import { getItem, setItem } from "@/configs/storage";
import area from "@/configs/area";
import { EditUserAddress, DelUserAddress } from "@/configs/serve";

const phoneRule = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;

export default {
  name: "PopAddress",
  data: () => ({
    chosenAddressId: "",
    area,
    list: [],
    showList: false,
    showEdit: false,
    delButton: true,
    addressInfo: {},
    switchable: false
  }),
  async created() {
    let address = (await GetUserAddress()) || getItem("address");
    if (address) {
      this.list = address;
      setItem("address", this.list);
      for (let item of address)
        if (item.isDefault) {
          this.chosenAddressId = item.id;
          return;
        }
    }
  },
  methods: {
    rule: tel => phoneRule.test(tel),
    showAddress(switchable) {
      if (this.list.length) this.showList = !(this.showEdit = false);
      else {
        this.showList = !(this.showEdit = true);
        this.delButton = false;
      }
      this.switchable = switchable;
    },
    editAddress(meta) {
      this.delButton = Boolean(meta);
      this.addressInfo = meta;
      this.showList = !(this.showEdit = true);
    },
    select(item) {
      this.$emit("selected", item);
      this.showList = false;
    },
    save(content) {
      let { province, city, county, addressDetail } = content;
      content.address = province + city + county + addressDetail;
      if (content.id) {
        this.list = this.list.map(item => {
          if (content.isDefault) item.isDefault = false;
          if (item.id == content.id) item = content;
          return item;
        });
      } else {
        content.id = this.list.length + 1;
        let item = { ...content };
        this.list.push(item);
      }
      EditUserAddress(content);
      setItem("address", this.list);
      this.showList = !(this.showEdit = false);
    },
    delAddress(content) {
      this.list = this.list.filter(item => {
        return item.id != content.id;
      });
      DelUserAddress(content.id);
      setItem("address", this.list);
      this.showList = !(this.showEdit = false);
    }
  }
};
</script>