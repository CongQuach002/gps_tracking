firebase.initializeApp(firebaseConfig);

var track = firebase.database().ref("GPS3");
var ref = firebase.database().ref("GPS2");
// ref.on("value", gotData);
var kinhdo;
var vido;
var time;
var min;
var se;
var dates;
var speed;
var kinhdo4;
var btncheck = document.getElementById("btn-check-2");
var btncheck2 = document.getElementById("btn-check-21");
var remove;
var time_ecall;
var kinhdo_ecall;
var vido_ecall;
var speed_ecall;
var date_ecall;
var polyline
var showline
var show
var showall
var made
var showa

show = document.getElementById('myCheck')
showall = document.getElementById('myCheck2')
showalla = document.getElementById('myCheck3')

var btnecall = firebase.database().ref().child("ecall")
btnecall.on('value', function (btnecall) {
    // AS.innerHTML=btnecall.val();
    console.log(btnecall.val());
    if (btnecall.val() < 1) {
        $('#staticBackdrop').modal('show');
    }

});

String.prototype.format = function () {
    var content = this;
    for (var i = 0; i < arguments.length; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        content = content.replace(reg, arguments[i]);
    }
    return content;

};
// check map
function checkmap(e) {
    navigator.geolocation.getCurrentPosition(function (location) {
        var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);

        L.marker(latlng).addTo(map)
            .bindPopup("Vị trí của bạn").openPopup();
        map.setView(latlng, 17); // zoom  

    });

}



// lib

// lib

// $('#myCheck').click(function() {
//     alert("Checkbox state (method 1) = " + $('#myCheck').prop('checked'));
//     alert("Checkbox state (method 2) = " + $('#myCheck').is(':checked'));
// });

var kinhdo3 = firebase.database().ref().child("GPS4/")
ref.on("value", ecall);


var make_gs;

// var layerGroup = L.layerGroup().addTo(map);
var markerArray = [];
var markerArray1 = [];


function gotData(data) {
    var scores = data.val();
    // Grab the keys to iterate over the object
    var keys = Object.keys(scores);
    // var textnode = document.createTextNode("Water")
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];

        // Look at each fruit object!
        vido = scores[k].LA;
        kinhdo = scores[k].LO;
        time = scores[k].TIME
        speed = scores[k].SP
        dates = scores[k].DATE

        var list = " <dt>Tracking</dt>" +
            "<dt>Time</dt>" +
            "<dd>" + time + "</dd>" +
            "<dt>Tọa Độ</dt>" +
            "<dd>" + vido + "," + kinhdo + "</dd>" +
            "<dt>Tốc độ</dt>" +
            "<dd>" + speed + "</dd>"
        
       
          made = L.marker([vido,kinhdo],{icon: car}).addTo(map).bindPopup(list)
          map.setView([vido, kinhdo], 17);
       
      
        var co = [vido, kinhdo]
        markerArray.push(co)


        // markerArray.push(co)
        // drawLine(markerArray)
     



        console.log(time)
        var row = $("<ul>");
        row.css("cursor", "pointer");
        row.append("<li class='col0'>{0},</li>".format(time));
        row.append("<li class='col0'>{0},</li>".format(vido));
        row.append("<li class='col0'>{0},</li>".format(kinhdo));
        row.append("<li class='col0'>{0}</li>".format(speed));
        row.click(function () {
            // alert($(this).text()); // get data from row on list 
            var time = $(this).text().split(',', 1)[0];
            var vido1 = $(this).text().split(',', 2)[1];
            var kinhdo2 = $(this).text().split(',', 3)[2];
            var speeds = $(this).text().split(',', 4)[3];
            var list = " <dt>Tracking</dt>" +
                "<dt>Time</dt>" +
                "<dd>" + time + "</dd>" +
                "<dt>Tọa Độ</dt>" +
                "<dd>" + vido1 + "," + kinhdo2 + "</dd>" +
                "<dt>Tốc độ</dt>" +
                "<dd>" + speeds + "</dd>"
            $(this).toggleClass('background_selected');
            make_gs = L.marker([vido1, kinhdo2], {
                icon: greenIcon
            }).addTo(map)
            make_gs.bindPopup(list)
            map.setView([vido1, kinhdo2], 17); // zoom 
           

        }); // ham click
        // sai jquery 
        $(".table-ul-body .table-ul").append(row);

    }

    console.log("LA", this.vido, "LO", this.kinhdo)
    // var show=document.getElementById('myCheck').checked



    show.onclick = function () {
        console.log(show.checked);
        if(show.checked == true){
    
            line(markerArray)
            
            map.setView([vido, kinhdo], 17);
    }
     else{
        map.removeLayer(showline)+map.removeLayer(polyline)
     }
      }

      showall.onclick = function () {
        // console.log(showall.checked);
        if(showall.checked == true){
            showa = true
            console.log(showa);
  
    }
    else{
        showa=false
        console.log(showa);

    }
      }
    
       
   
}

function line(data) {
     polyline = L.polyline(data, {
        color: 'blue'
    }).addTo(map);
    // // draw 5 arrows per line
    showline = L.featureGroup(getArrows(data, 'red', 2, map)).addTo(map);
    
}


//


// ecall
function ecall(data) {
    var scores = data.val();
    // Grab the keys to iterate over the object
    var keys = Object.keys(scores);
    // var textnode = document.createTextNode("Water")
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        // Look at each fruit object!
        vido_ecall = scores[k].LA;
        kinhdo_ecall = scores[k].LO;
        time_ecall = scores[k].TIME
        speed_ecall = scores[k].SP
        date_ecall = scores[k].DATE
        console.log(i)
        document.getElementById('count').innerHTML = i
        console.log(time_ecall)
        var row = $("<ul>");
        row.css("cursor", "pointer");
        row.append("<li class='col0'>{0},</li>".format(time_ecall));
        row.append("<li class='col0'>{0},</li>".format(vido_ecall));
        row.append("<li class='col0'>{0},</li>".format(kinhdo_ecall));
        row.append("<li class='col0'>{0}</li>".format(speed_ecall));
        row.click(function () {
            // alert($(this).text()); // get data from row on list 
            var time = $(this).text().split(',', 1)[0];
            var vido1 = $(this).text().split(',', 2)[1];
            var kinhdo2 = $(this).text().split(',', 3)[2];
            var speeds = $(this).text().split(',', 4)[3];
            var list =
                "<dt>Ecall</dt>" +
                "<dl><dt>Time</dt>" +
                "<dd>" + time + "</dd>" +
                "<dt>Tọa Độ</dt>" +
                "<dd>" + vido1 + "," + kinhdo2 + "</dd>" +
                "<dt>Tốc độ</dt>" +
                "<dd>" + speeds + "</dd>"
            $(this).toggleClass('background_selected');
            make_gs = L.marker([vido1, kinhdo2], {
                icon: waring
            }).addTo(map)
            make_gs.bindPopup(list)
            map.setView([vido1, kinhdo2], 17); // zoom 

        }); // ham click
        // sai jquery 
        $(".table-ul-body-ecall .table-ul-ecall").append(row);
    }
    console.log("LA", this.vido_ecall, "LO", this.kinhdo_ecall)
    document.getElementById('time_ecal').innerHTML = time_ecall
    document.getElementById('date_ecal').innerHTML = date_ecall
    document.getElementById('vido_ecal').innerHTML = vido_ecall
    document.getElementById('kinhdo_ecal').innerHTML = kinhdo_ecall
    document.getElementById('speed_ecal').innerHTML = speed_ecall


}


// check button


var btn1 = false;
var btn2 = false;
var btn3 = false;
var btn_ecall = false;


$('#tk,#gs,#ecall').click(function () {
    if (this.id == 'tk') {
        btn1 = true;



    }
    if (this.id == 'gs') {
        btn2 = true;


        // 

    }
    if (this.id == 'ecall') {
        btn3 = true;


    }
    if (this.id == 'btn_ecall') {
        btn_ecall = true;


    }


});


var btnecall = firebase.database().ref().child("ecall")
btnecall.on('value', function (btnecall) {
    // AS.innerHTML=btnecall.val();
    console.log(btnecall.val());
    if (btnecall.val() < 1) {
        $('#staticBackdrop').modal('show');
    }

});
var list2
function click_pass() {
    var myModal = document.getElementById('modal')
    var pass = document.getElementById('pass').value
    var passW = firebase.database().ref().child("pass")
    passW.on('value', function (passW) {
        var pass2 = passW.val();
        // btn search
        if (pass == pass2 && btn1 == true) {
            $('#modal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            console.log("test1");
            // alert("Chế độ Checking Real Time")
            kinhdo3.on('value', function (kinhdo3) {
                // AS.innerHTML=kinhdo3.val();

                kinhdo4 = kinhdo3.val().LO
                var time = kinhdo3.val().TIME
                var vido4 = kinhdo3.val().LA
                var sp = kinhdo3.val().SP

                var co = [vido4, kinhdo4]
                markerArray1.push(co)
        
                document.getElementById('time').innerHTML = time
                // document.getElementById('date').innerHTML = dates
                document.getElementById('kinhdo').innerHTML = kinhdo4
                document.getElementById('vido').innerHTML = vido4
                document.getElementById('speed').innerHTML = sp + " kpm";
                 list2 =
                    "<dt>Test</dt>" +
                    "<dt>Time</dt>" +
                    "<dd>" + time + "</dd>" +
                    "<dt>Tọa Độ</dt>" +
                    "<dd>" + vido4 + "," + kinhdo4 + "</dd>" +
                    "<dt>Tốc độ</dt>" +
                    "<dd>" + sp + "</dd>"
                remove = L.marker([vido4, kinhdo4], {
                    icon: car
                }).addTo(map).bindPopup(list2)
                map.setView([vido4, kinhdo4], 17);


                showalla.onclick = function () {
                    console.log(showalla.checked);
                    if(showalla.checked == true){
                       
                       line(markerArray1)
                       map.setView([vido4, kinhdo4], 17);
                }
                if(showalla.checked == false){
                    remove = L.marker([vido4, kinhdo4], {
                        icon: car
                    }).addTo(map).bindPopup(list2)
                    map.removeLayer(showline)+map.removeLayer(polyline)
                }
                  }
            });
            
        

            document.getElementById('gr_serach').style.display = 'block'
            document.getElementById('list_ul').style.display = 'none'
            document.getElementById('list_ulecall').style.display = 'none'

        }
        if (pass == pass2 && btn2 == true) {
            track.on("value", gotData);
            $('#modal').modal('hide');
            $('.modal-backdrop').remove();
            console.log("test12");
            document.getElementById('list_ul').style.display = 'block'
            document.getElementById('gr_serach').style.display = 'none'
            document.getElementById('list_ulecall').style.display = 'none'
        }
        if (pass == pass2 && btn3 == true) {

            $('#modal').modal('hide');
            $('.modal-backdrop').remove();
            console.log("test12");
            document.getElementById('list_ul').style.display = 'none'
            document.getElementById('gr_serach').style.display = 'none'
            document.getElementById('list_ulecall').style.display = 'block'

        } else {
            document.getElementById("tb").innerHTML = "Mật khẩu sai rồi hay thử lại nhé!"
        }
    });

}





// icon 
var greenIcon = L.icon({
    iconUrl: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var car = L.icon({
    iconUrl: 'icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var d7 = L.icon({
    iconUrl: 'D7.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var waring = L.icon({
    iconUrl: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|e85141&chf=a,s,ee00FFFF',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var vtmap = "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
var mapthuong = "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
var map123 = mapthuong;

// var options = {
//     position: 'topleft',
//     lengthUnit: {
//       factor: 0.539956803,    //  from km to nm
//       display: 'Nautical Miles',
//       decimal: 2
//     }
//   };
// L.control.ruler(options).addTo(map);
// tạo map


var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}), googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}), googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
var map = L.map('mapId').setView([10.8447125, 106.797841667], 5,  [googleStreets, googleHybrid,googleSat]);
var baseMaps = {
    "Đường đi": googleStreets,
    "Vệ tinh ": googleHybrid
};
L.control.layers(baseMaps).addTo(map);
L.tileLayer(map123, {
    attribution: '&copy; <a href="https://www.facebook.com/cong.quachthai">Công Quách</a> contributors',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);

