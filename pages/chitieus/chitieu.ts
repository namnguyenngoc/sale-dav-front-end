import Vue from 'vue';
import axios from 'axios';
import moment from 'moment';
import config from '@/config/config';
import PageFooter from '@/components/footer/index';
import PageHeader from '@/components/header/index';
import 'vue-swipe-actions/dist/vue-swipe-actions.css';
import { SwipeList, SwipeOut } from 'vue-swipe-actions';

export default Vue.extend({
  name: 'Chitieu',
  data: () => {
        return {
          msg: 'This is chi tieu',
          typeList: ['GOP', 'WO_GOP', 'ALL'],
          includeGop: 'WO_GOP',
          srcProcNm: "",
          selectDateCurrent: {
            code: String,
            title: String
          },
          items_ky_chi: new Array(),
          chiTieuCTTList: [],
          items_status: [
            { code: 'CSK', title: 'Chờ sao kê' },
            { code: 'CTT', title: 'Chờ thanh toán' },
            { code: 'NX', title: 'Nợ xấu' },
            { code: 'DTCSK', title: 'ĐT-CSK' },
            { code: 'TG', title: 'Trả Góp' },
          ],
          // Swipe
          stsThanhToan: [
            {
              id: 'DN',
              name: 'Dư nợ',
            },
            {
              id: 'NX',
              name: 'Nợ xấu',
            },
            {
              id: 'CTT',
              name: 'Chờ thanh toán',
            },
            {
              id: 'CSK',
              name: 'Chờ sao kê',
            },
            {
              id: 'FAIL',
              name: 'GD lỗi',
            },
            {
              id: 'DTCSK',
              name: 'ĐT-CSK',
            },
            { id: 'TG', name: 'Trả Góp' },
          ],
          enabled: true,
          mockSwipeList: [
            {
              id: 0,
              title: 'Some title',
              description: 'some description',
            },
            {
              id: 1,
              title: 'Some title',
              description: 'some description',
            },
            {
              id: 2,
              title: 'Some title',
              description: 'some description',
            },
          ],
          // End Swipe
          saleOrder: {
            order_customer_type: 'KL',
          },
          allStatusChecked: false,
          originListChiTieu: [],
          chiTieuList: [],
          chiTieuCSKList: [], // Cho sao ke
          chiTieuDCList: [], // Du Chi
          chiTieuErList: [], // GD Loi
          bankChecked: ['HSBC', 'SC BANK', 'CITI BANK', 'VIB'],
        }
    },
    components: {
        PageHeader,
        PageFooter,
        SwipeOut,
        SwipeList,
    },
    filters: {
      moment: function (d: moment.MomentInput) {
        return moment(d).format('MMMM Do YYYY, h:mm:ss a')
      },
    },
    methods: {
      moment2(d: String) {
        return moment(String(d)).format("DD-MM-YYYY");
      },
      // formatPrice (value: Number, tofix: Number) {
      //   const val = (value / 1).toFixed(tofix).replace(',', '.');
      //   return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      // },
      filterStatus () {
        console.log('fiter')
        const seft = this;
        var newList = this.originListChiTieu;
        console.log(this.bankChecked)
        // if (filter && value !== '') {

        // }
        if (this.bankChecked === undefined || this.bankChecked.length === 0) {
          // this.getChiTieus()
        } else {
          newList = newList.filter(function (item: {bank_code: String}) {
            // Filter bank
            for (var key in seft.bankChecked) {
              if (item.bank_code === seft.bankChecked[key]) return true
            }
            return false
          })
          this.chiTieuList = newList;
        }
      },
      async getChiTieus () {
        const self = this
        console.log('getChiTieus')
        // console.log("allStatusChecked", this.allStatusChecked);
        // console.log(this.saleOrder);

        var orderType = [];
        // if (!this.customerTypeModal.ALL) {
        //   if (this.customerTypeModal.KS) {
        //     orderType.push("'KS'")
        //   }
        //   if (this.customerTypeModal.KL) {
        //     orderType.push("'KL'")
        //   }
        //   if (this.customerTypeModal.CTV) {
        //     orderType.push("'CTV'")
        //   }
        // } else {
        //   orderType.push("'KL'")
        //   orderType.push("'KS'")
        //   orderType.push("'CTV'")
        // }
        // console.log(orderType.toString())
        // this.saleOrder.order_customer_type = orderType.join();
        let currentNow = new Date();
        let kyChi = [(this.selectDateCurrent == undefined || this.selectDateCurrent.code == null)
                  ? (currentNow.getMonth() + (currentNow.getDate() > 27 ? 2 : 1)).toString().concat(currentNow.getFullYear().toString()) : this.selectDateCurrent.code];
        // console.log("kyChi", kyChi);
        // console.log("this.selectDateCurrent.code", this.selectDateCurrent.code);
        await axios
          .get(`${config.API_FAMILY}/api/chitieus/${JSON.stringify(kyChi)}/${this.allStatusChecked}/${this.includeGop}`)
          .then(function (response) {
            self.chiTieuList = response.data.data;
            self.originListChiTieu = response.data.data;
            // self.originListChiTieu = self.chiTieuList
            // Dư nọ - chờ sao kê
            // self.chiTieuList = self.originListChiTieu.filter(function (item) {
            //   if (item.status === 'DN') return true
            // })

            // // // Cho Thanh toan
            // self.chiTieuCTTList = self.originListChiTieu.filter(function (item) {
            //   if (item.status_nm === 'CTT') return true
            // })
            // // console.log("chiTieuCTTList", self.chiTieuCTTList)
            // // Du Chi
            // self.chiTieuCSKList = self.originListChiTieu.filter(function (item) {
            //   if (item.status_nm === 'CSK') return true
            // })

            // // Loi
            // self.chiTieuErList = self.originListChiTieu.filter(function (item) {
            //   if (item.status === 'FAIL') return true
            // })

            // self.totalChiTieu()
            // self.filterStatus()
          // console.log(JSON.stringify(self.chiTieuList))
          // self.chiTieuCTTList = response.data.data;
          })
      },
      searchList () {},
      itemClick() {},
      changeChiTieuStatus () {},
    },
    computed: {
      
      //   ...bankState("bank", {
      //     bankList: "bankList",
      // })
      totals () {
        let sums = 0;
        for (let idx in this.chiTieuList) {
          sums += parseFloat(this.chiTieuList[idx].so_tien);
        };
        return formatPrice(sums, 0);
      },
      //  chiTieuCSKList: [], // Cho sao ke
      //   chiTieuCTTList: [], // Cho Thanh toan
      //   chiTieuDCList: [], // Du Chi
      //   chiTieuErList: [], // GD Loi
      totalTatToan () {
        let sums = 0;
        for (var idx in this.chiTieuCTTList) {
          sums += parseFloat(this.chiTieuCTTList[idx].so_tien);
        }
        return sums
      },
      totalCSK () {
        let sums = 0;
        for (var idx in this.chiTieuCSKList) {
          sums += parseFloat(this.chiTieuCSKList[idx].so_tien);
        }
        return sums
      },
      totalDC () {
        let sums = 0;
        for (var idx in this.chiTieuDCList) {
          sums += parseFloat(this.chiTieuDCList[idx].so_tien);
        }
        return sums
      },
      totalEr () {
        let sums = 0;
        for (var idx in this.chiTieuErList) {
          sums += parseFloat(this.chiTieuErList[idx].so_tien);
        }
        return sums;
      },
      items_ky_chi_list (){
        console.log("month_");
        let monList = moment.months();
        let yearList = [2020, 2021, 2022];
        
        let items_ky_chi_new = [];
        let currentNow = new Date();
        let items_ky_chi_old= [];
        for(var i in yearList){
          for(var j in monList){
              let value: String;
              value = moment().month(monList[j]).format("M").concat(yearList[i].toString());
             
              let obj = { 
                          code: value,
                          title: value,
                          disabled: false,
                          divider: false
                        }
              if(yearList[i] < currentNow.getFullYear() 
                || (
                    parseInt(moment().month(monList[j]).format("M")) < currentNow.getMonth() + 1 
                    && yearList[i] == currentNow.getFullYear() 
                  )){
                    items_ky_chi_old.push(obj);
              }else {
                items_ky_chi_new.push(obj);
                
              }
          }
        }//endfor
        items_ky_chi_new.push(
          {
            divider: true,
            header: "----Đã CSK----"
          }
        );
        console.log("new Month");
        console.log(items_ky_chi_new);
        
        this.items_ky_chi = items_ky_chi_new.concat(items_ky_chi_old);
        return this.items_ky_chi;
      }
    }
});


function formatPrice(value: number, tofix: number) {
  const val = (value / 1).toFixed(tofix).replace(',', '.');
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
