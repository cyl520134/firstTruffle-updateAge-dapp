App = {
  web3Provider: null,
  contracts: {},

  init: function () {
    return App.initWeb3();
  },

  /**初始化web3,与钱包联通 */
  initWeb3: function () {
    if (window.ethereum) {
      this.provider = window.ethereum;
      try {
        window.ethereum.enable();
      } catch (error) {
        console.error("User denied account access");
      }

      App.web3Provider = web3.currentProvider
    } else if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(App.web3Provider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545')
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  /**获取账户的合约，绑定事件，并且设置监听*/
  initContract: function () {

    $.getJSON('InfoContract.json', function (data) {
      /**获取合约*/
      App.contracts.InfoContract = TruffleContract(data);
      /**连接账户*/
      App.contracts.InfoContract.setProvider(App.web3Provider);
      /**初始化数据 */
      App.getInfo();
      /**设置监听 */
      App.watchChanged();
    });

    /**绑定事件 */
    App.bindEvents();

  },

  /**合约交互，获取用户的年龄数据，显示在html上 */
  getInfo: function () {
    App.contracts.InfoContract.deployed().then(function (instance) {
      return instance.getInfo.call();
    }).then(function (result) {
      $("#loader").hide();
      $("#info").html(result[0] + ' (' + result[1] + ' years old)');
      console.log(result);
    }).catch(function (err) {
      console.error(err);
    });
  },

  /**更新按钮上绑定事件，调用合约进行更新 */
  bindEvents: function () {
    $("#button").click(function () {
      $("#loader").show();
      web3 = new Web3(App.web3Provider);

      web3.eth.defaultAccount = web3.eth.accounts[0];

      App.contracts.InfoContract.deployed().then(function (instance) {
        return instance.setInfo($("#name").val(), $("#age").val(), { gas: 500000 });
      }).then(function (result) {
        return App.getInfo();
      }).catch(function (err) {
        console.error(err);
      });
    });
  },

  /**监听合约内容发生改变，则页面显示更新 */
  watchChanged: function () {
    App.contracts.InfoContract.deployed().then(function (instance) {
      var infoEvent = instance.Instructor();
      return infoEvent.watch(function (err, result) {
        $("#loader").hide();
        $("#info").html(result.args.name + ' (' + result.args.age + ' years old)');
      });
    });
  }

}



$(function () {
  $(window).load(function () {
    App.init();
  });
});
