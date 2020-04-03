// <template>
//             <Modal
//                 v-model="visible"
//                 :title="title"
//                 @on-ok="ok"
//                 @on-cancel="cancel"
//             >
//                 <ol>
//                     <li v-for="(value,key,index) in Data" :key="index">
//                         <span>{{key}}</span>
//                         <Input type="text"
//                                v-model="Data[key]"
//                                :disabled="dataOptions.disabled.includes(index)"
//                                :type="dataOptions.typeAreas.includes(index) ? 'textarea' : 'text'"
//                         />
//                     </li>
//                 </ol>
//             </Modal>
//     </template>
//     <script>
//       export default {
//         name: "myModel",
//         props: {
//           data:{ type: Object },
//           show: Boolean,
//           options: {
//             type: Object
//           }
//         },
//         data() {
//           return {
//             visible: this.show,
//             Data: this.data,
//             isEdited: false,
//             title: '编辑',
//             style: {
//               // width: this.dataOptions.width,
//             }
//           }
//         },
//         computed: {
//           dataOptions(){
//             return this.options;
//           }
//         },
//         watch: {
//           show(newv,oldv){
//             this.visible = newv;
//           },
//           Data: {
//             handler(){
//               this.isEdited = true;
//             }
//           }
//         },
//         mounted() {
//           console.log(this.Data);
//         },
//         methods: {
//           ok(){
//             this.visible = false;
//             if(this.isEdited)
//             this.$emit('mdyData',this.data);
//             this.$emit('showModel',this.visible);
//           },
//           cancel(){
//             this.visible = false;
//             this.$emit('showModel',this.visible);
//           },
//         }
//       }
//     </script>




    <template>
        <div id="user-manage">
            <article class="border">
                <div class="um-body" ref="fiBody">
                    <Table
                            :columns="filterColumns"
                            :data="filterData"
                            :max-height="maxHeight"
                            no-filtered-data-text="/"
                            ref="filterTable"
                    >
                        <template slot-scope="{ row, index }" slot="action">
                            <div>
                                <svg class="icon" aria-hidden="true" @click="handleUserEdit(row,index)">
                                    <use xlink:href="#icon-bianji"></use>
                                </svg>
                                <svg class="icon" aria-hidden="true" @click="handleUserDel(row,index)">
                                    <use xlink:href="#icon-shanchu"></use>
                                </svg>
                            </div>
                        </template>
                    </Table>
                </div>
                <div class="um-footer">
                    <Page
                            :total="100"
                            show-elevator
                            :page-size="10"
                            size="small"
                            @on-change="handlePage"
                    />
            </article>
            <my-modal :show="editShow" :data="renderData" 
            :options="editOptions" v-on:showModel = "showModel" 
            v-on:mdyData="myData">
            </my-modal>
        </div>
    </template>
    
    <script>
      import myModel from '../../components/myModel.vue'
      export default {
        name: "userMan",
        components: {
          'my-modal': myModel
        },
        data(){
          return {
            editShow: false,
            maxHeight: '',
            // autoHeight: 600,
            filterColumns: [],
            filterData: [],
            renderData: {},
            editOptions: {
              width: '75%',
              disabled: [0],
              typeAreas: [8],
            }
          }
        },
        methods: {
          handleUserEdit(row, index) {
            this.editShow = true;
            this.filterColumns.forEach((item,index) => {
              if(index < this.filterColumns.length - 1 )
                this.$set(this.renderData, item.title, row[item.key]);
            });
            console.log('editshow: ',this.editShow);
          },
          handleUserDel(row,index){
          },
          addEqu(){
            this.editShow = true;
          },
          delOk(){},
          delCancel(){},
          handlePage(page){
            console.log(page)
          },
          myData(data){
            console.log('来自子组件： ',data);
          },
          showModel(show){
            console.log('show: ',show);
            this.editShow = show;//这里的show是为了让modal组件里的show监听到变化
          }
        }
      }
    </script>
