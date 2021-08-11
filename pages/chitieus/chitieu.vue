<template>
  <v-row>
    <v-col>
      <page-header
        title="Thông tin chi tiêu gia đình"
      ></page-header>

      <v-row class="page-condition-seach">
        <v-col cols="10">
          <v-row>
            <v-col cols="1">
              <v-checkbox
                v-model="bankChecked"
                value="HSBC"
                label="HSBC"
                color="red"
                class="pa-0 ma-0 ml-0 mt-3"
                hide-details
                @change="filterStatus()"
              />
            </v-col>
            <v-col cols="1">
              <v-checkbox
                v-model="bankChecked"
                label="SC"
                value="SC"
                color="red"
                class="pa-0 ma-0 ml-3 mt-3"
                hide-details
                @change="filterStatus()"
              />
            </v-col>
            <v-col cols="1">
              <v-checkbox
                v-model="bankChecked"
                label="VIB"
                value="VIB"
                color="red"
                class="pa-0 ma-0 ml-3 mt-3"
                hide-details
                @change="filterStatus()"
              />
            </v-col>
            <v-col cols="1">
              <v-checkbox
                v-model="allStatusChecked"
                label="Tất cả"
                value="ALL"
                color="red"
                class="pa-0 ma-0 ml-3 mt-3"
                hide-details
                @change="getChiTieus()"
              />
            </v-col>
            <v-col cols="1">
            </v-col>
          </v-row>
          <v-row>
            <v-col col="1">
               <v-text-field
                v-model="totals"
                label="Tổng số tiền"
                class="text-right"
                suffix="VNĐ"
                readonly
                dense
              ></v-text-field>
            </v-col>

            <v-col col="3">
              <v-text-field
                v-model="srcProcNm"
                label="Nội dung chi"
                @keyup.enter="searchList()"
                dense
                class="pl-2 find-by-name-workflow"
              ></v-text-field>
            </v-col>

            <v-col col="3">
              <v-autocomplete
                :items="this.typeList"
                v-model="includeGop"
                label="GÓP"
                value="WO_GOP"
                color="red"
                item-text="title"
                item-value="code"
                @change="getChiTieus()"
                hide-details=""
                dense
                return-object
              />
            </v-col>

            <v-col col="1">
              <v-autocomplete
                :items="this.items_ky_chi_list"
                v-model="selectDateCurrent"
                label="Kỳ"
                item-text="title"
                item-value="code"
                @change="getChiTieus()"
                hide-details=""
                dense
                return-object
              />
            </v-col>
            
            <v-col col="2">
              End
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="2">
        </v-col>
      </v-row>
      <v-row class="page-list">
        <v-col cols="12" class="lists">
          <swipe-list
              ref="list"
              class="card lst-items"
              :items="chiTieuList"
              height="100px"
              item-key="id"
              @swipeout:click="itemClick"
            >
              <template
                v-slot="{ item }"
              >
                <v-col class="card-content">
                  <v-row>
                    <v-col
                      cols="12"
                      md="12"
                    >
                      <v-row>
                        <v-col
                          cols="12"
                          md="12"
                          class="pa-1"
                        >
                          <!-- style content how ever you like -->
                          <a
                            href="/"
                            style="text-decoration: none;"
                          >
                            <h4>{{ item.noi_dung }}</h4>
                          </a>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="5"
                          class="pa-1"
                        >
                          {{ item.bank_code }} ({{ moment2(item.ngay_chi) }})
                        </v-col>
                        <v-col
                          cols="4"
                          class="pa-1"
                          :style="item.status_nm == 'FAIL'||item.status_nm == 'NX' ? 'color: #FF0000' : ''"
                        >
                          <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                :color="item.status_nm == 'FAIL'||item.status_nm == 'NX' ? 'error' : 'primary'"
                                dark
                                v-bind="attrs"
                                class="rounded-10"
                                v-on="on"
                              >
                                {{ stsThanhToan.filter(sts => sts.id == item.status_nm).pop().name }}
                              </v-btn>
                            </template>
                            <v-list>
                              <v-list-item
                                v-for="(item1, index) in items_status"
                                :key="index"
                              >
                                <v-list-item-title @click="changeChiTieuStatus(item, item1)">
                                  {{ item1.title }}
                                </v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </v-col>
                        <v-col
                          cols="3"
                          style="color: #FF0000"
                          class="pa-1"
                        >
                          <!-- <strong>{{ formatPrice(item.so_tien, 0) }}</strong> -->
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="3"
                          class="pa-1"
                        >
                          {{ item.ky_chi }}
                        </v-col>
                        <v-col
                          cols="6"
                          class="pa-1 pt-0 pb-1 text-right"
                        />
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
                <v-divider class="dark-gray" />
              </template>
              <!-- left swipe side template and v-slot:left="{ item }" is the item clearly -->
              <!-- remove if you dont wanna have left swipe side  -->
              <!-- right swipe side template and v-slot:right"{ item }" is the item clearly -->
              <!-- remove if you dont wanna have right swipe side  -->
              <template v-slot:right="{ item }">
                <div
                  class="swipeout-action gray"
                >
                  <v-icon color="white">
                    mdi-trash
                  </v-icon>
                  <!-- place icon here or what ever you want -->
                </div>
                <div
                  class="swipeout-action text-center red pa-4"
                  @click="confirmDeleteChiTieu(item)"
                >
                  <v-icon color="white">
                    mdi-close
                  </v-icon>
                  <!-- place icon here or what ever you want -->
                  <!-- <i class="fa fa-heart"></i> -->
                </div>
              </template>
              <template v-slot:empty>
                <div>
                  <!-- change mockSwipeList to an empty array to see this slot in action  -->
                  list is empty ( filtered or just empty ) abc
                </div>
              </template>
            </swipe-list>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script lang="ts" src="./chitieu.ts"></script>
<style lang="scss" scoped src="./chitieu.scss"></style>