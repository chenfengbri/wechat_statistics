// ==UserScript==
// @name          微信后台pv、uv统计插件
// @namespace     http://ratwu.com
// @description   在微信管理后台显示文章pv、uv数据
// @version	      v1.1
// @include       http://admin.wechat.com/*
// ==/UserScript==

var Stat = {

	article_elements: function () {
						var table_div = document.createElement("div");
						table_div.id = "pv_uv_div";
						table_div.style.cssText = "width: 186px; margin: 30px auto;z-index:100000;position:relative";

						var h3 = document.createElement("h3");
						h3.style.cssText="text-align: center; color: rgb(133, 133, 133); background-color: rgb(230, 230, 230); margin:0 -2px 5px";
						h3.innerHTML = "PV/UV 汇总";
						table_div.appendChild(h3);
						var sidebar = document.getElementsByClassName("sideBar")[0];
						sidebar.appendChild(table_div);
						return document.getElementsByClassName("i-title");
					},

	createRecord: function (title, pv, uv) {
					var table_div = document.getElementById("pv_uv_div");
					var table = document.createElement("table");
					table.border = "1";
					table.style.cssText="border-collapse:collapse;border-spacing:0; margin-bottom:3px;border-color:#c9c9c9；border-color:#e1e1e1";
					table_div.appendChild(table);
					var row = document.createElement("tr");
					table.appendChild(row);
					var td1 = document.createElement("td");
					td1.width="86px";
					row.appendChild(td1);
					var td2 = document.createElement("td");
					row.appendChild(td2);
					td2.width="45px";
					var td3 = document.createElement("td");
					td3.width = "45px";
					row.appendChild(td3);

					td1.innerHTML = title;
					td2.innerHTML = uv;
					td3.innerHTML = pv;
				},


	get_pv_uv: function (element) {
 					var req = new XMLHttpRequest();
    				var url = "http://admin.wechat.com/cgi-bin/statappmsg?token=1337323640&t=ajax-appmsg-stats&url=" + encodeURIComponent(element.href);
    				var title = element.innerHTML;
    				req.open("GET", url, true);
    				// req.onload = this.showData.bind(this, article_id, article_name);
    				req.onload = this.sikemiFunction.bind(this, title);
   					req.send(null);
				},
	get_batch_pv_uv: function (elements) {
						var len = elements.length;
						for (var i = 0; i < len; i++) {
							this.get_pv_uv(elements[i]);	
						};
						this.get_pv_uv();
					},

	sikemiFunction: function (title, e){
						var data = JSON.parse(e.target.response);
						Stat.createRecord(title, data.PageView, data.UniqueView);
					}
};

function contentEval( source ) {
	if ('function' == typeof source) {
		source = '(' + source + ')();'
	}
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}

contentEval(Stat.get_batch_pv_uv(Stat.article_elements()));