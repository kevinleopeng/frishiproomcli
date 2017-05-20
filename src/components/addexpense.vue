<template>
  <el-dialog title="添加支出" :visible.sync="dialogFormVisible" :show-close="false">
    <el-form :model="form" :label-position="labelPosition">
      <el-form-item label="支出类别" :label-width="formLabelWidth" class="inline-block width-align">
        <el-select v-model="form.type"  @change='categoryChanged' placeholder="请选择支出类别">
          <el-option v-for="(value,key) in firstClassCategories" :label="value" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支出项目" :label-width="formLabelWidth" class="inline-block width-align">
        <el-select v-model="form.actualProj" placeholder="请选择支出项目">
          <el-option v-for="(value,key) in secondClassCategories" :label="value" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支出单价" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.price" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="支出数量" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.count" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="支出额度" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="totals" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="财务实际支出" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="fiscalCharges" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="财务支出剩余" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="surpluses" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="支出人" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.userName" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="支出时间" :label-width="formLabelWidth" class="inline-block width-align">
        <el-date-picker
          v-model="form.time"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="所属房屋" :label-width="formLabelWidth" class="inline-block">
        <el-select v-model="form.homeId"   placeholder="请选择所属房屋">
          <el-option v-for="item in homes" :label="item.address" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否垫资" :label-width="formLabelWidth">
        <el-switch
          v-model="form.isAdvancePay"
          on-value="1"
          off-value="0"
          on-color="#13ce66"
          off-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item v-if='form.isAdvancePay == 1' label="垫支人" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.advancePerson" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item v-if='form.isAdvancePay == 1' label="垫支额度" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.advanceAmount" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item v-if='form.isAdvancePay == 1' label="是否结算" :label-width="formLabelWidth">
        <el-switch
          v-model="form.settlementStatus"
          on-value="1"
          off-value="0"
          on-color="#13ce66"
          off-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth" >
        <el-input type="textarea" v-model="form.description" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="支付凭证" :label-width="formLabelWidth">
        <file-upload></file-upload>
        <!--<el-input v-model="form.certificate" auto-complete="off"></el-input>-->
      </el-form-item>
      <el-form-item class="float-align">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>

    <!--<div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>-->
  </el-dialog>
</template>

<script>
  import FileUpload from "./fileupload";

  export default {
    name: 'AddExpense',
    components: {
     "file-upload": FileUpload
    },
    data() {
      return {
        form: {
          type: '',
          actualProj: '',
          price: '',
          count: '',
          total: '',
          fiscalCharge: '',
          surplus: '',
          userName: '',
          time: '',
          isAdvancePay: '0',
          advancePerson: '',
          advanceAmount: '',
          settlementStatus: '0',
          certificate: '',
          description: '',
          homeId: ''
        },
        categories: {},
        firstClassCategories: {},
        secondClassCategories: {},
        homes: [],
        formLabelWidth: '120px',
        labelPosition: 'right'
      }
    },
    computed: {
      totals: function(){
          this.form.total = this.form.price * this.form.count;
          return this.form.total;
      },
      fiscalCharges: function() {
          this.form.fiscalCharge = this.totals;

          return this.form.fiscalCharge;
      },
      surpluses: function() {
          this.form.surplus = this.fiscalCharges - this.totals;
          return this.form.surplus;
      }
    },
    props:['dialogFormVisible'],
    methods: {
      getData() {
        var _this = this;
        this.$ajax.get('http://localhost:8080/fsr.web/category').then(res => {
          //var _data = JSON.parse(res.data);
          console.log(res.data);
          _this.categories = res.data.data;
          _this.firstClassCategories = _this.categories["0"];
        }, res => {

        });
        this.$ajax.get('http://localhost:8080/fsr.web/home').then(res => {
          //var _data = JSON.parse(res.data);
          console.log(res.data);
          _this.homes = res.data.data;
        }, res => {

        });
      },
      categoryChanged(item) {
        this.secondClassCategories = this.categories[item];
      },
      onSubmit() {
        var _this = this;
        this.$ajax({
          method: 'post',
          url: 'http://localhost:8080/fsr.web/expense/add',
          data: this.form
        }).then(res => {
          console.log(res.data);
          if (res.data.code == '0001') {
            _this.$message({
              message: res.data.message,
              type: 'success'
            });
           // _this.dialogFormVisible = false;
            _this.close();
          } else {
            _this.$message.error(res.data.message);
          }
        }, res => {

        });
      },
      close() {
        this.$emit('closeForm');
      }
    },
    created(){
      this.getData();
    }
  }
</script>

<style>
  .inline-block {
    display: inline-block;
  }
  .width-align {
    width: 296px;
  }
  .float-align {
    float: right;
  }
  .el-dialog__header {
    height: 50px;
  }
  .el-dialog__title {
    position: relative;
    top: -80px;
  }
</style>
