<template>
  <div >
    <el-row type="flex" class="row-bg row-first">
      <el-col :span="20">
        <el-button type="info" size='large' icon="plus" class="add-btn" @click="formVisible = true">添加</el-button>
        <friendship-addincome v-bind:dialog-form-visible="formVisible" v-on:closeForm="closeForm"></friendship-addincome>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <el-table
            :data="incomes"
            height="500"
            max-height="550px"
            :row-class-name="tableRowClassName">
            <el-table-column type="expand">
              <template scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="收入项目">
                    <span>{{ props.row.incomeActualProj }}</span>
                  </el-form-item>
                  <el-form-item label="收入单价">
                    <span>{{ props.row.price }}</span>
                  </el-form-item>
                  <el-form-item label="收入数量">
                    <span>{{ props.row.count }}</span>
                  </el-form-item>
                  <el-form-item label="收入总额度">
                    <span>{{ props.row.fiscalCharge }}</span>
                  </el-form-item>
                  <el-form-item label="收入备注">
                    <span>{{ props.row.description }}</span>
                  </el-form-item>
                  <el-form-item label="所属房屋">
                    <span>{{ props.row.homeAddress }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="incomeType"
              label="收入类别"
              width="180">
              <template scope="scope">
                <el-tag
                  type='primary'
                  close-transition>{{scope.row.incomeType}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="incomeActualProj"
              label="收入项目"
              width="180">
              <template scope="scope">
                <el-tag
                  type='success'
                  close-transition>{{scope.row.incomeActualProj}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="fiscalCharge"
              label="收入额度">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="收入人">
              <template scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag>{{ scope.row.userName }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="incomeTime"
              label="收入时间">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="end">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[20, 50, 100, 200]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>


<script>

  import AddIncome from '../components/addincome.vue'

  export default {
    name: 'IncomeManage',
    components : {
      'friendship-addincome': AddIncome
    },
    data() {
      return {
        incomes: [],
        page: 1,
        totalPages: 0,
        total: 0,
        pageSize: 20,
        formVisible: false
      }
    },
    props:[],
    methods: {
      tableRowClassName(row, index) {
        if (index === 1) {
          return 'info-row';
        } else if (index === 3) {
          return 'positive-row';
        }
        return '';
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getData();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.getData();
      },
      getData() {
        var _this = this;
        this.$ajax.get('http://localhost:8080/fsr.web/income?page='+this.page+'&pageSize='+this.pageSize).then(res => {
          //var _data = JSON.parse(res.data);
          console.log(res.data);
          _this.incomes = res.data.data;
          _this.page = res.data.currentPage;
          _this.totalPages = res.data.totalPage;
          _this.total = res.data.total;
        }, res => {

        });
      },
      closeForm() {
        this.formVisible = false;
        this.getData();
      }
    },
    created(){
      this.getData();
    }
  }
</script>

<style>
  .el-table .info-row {
    background: #c9e5f5;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }


  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .row-first {
    height: 60px;
  }

  .add-btn {
    position: relative;
    top: -65px;
  }
</style>
