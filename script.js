var hadith         = document.getElementById('hadith');
var translation    = document.getElementById('translation');
var scroll_hadith  = document.getElementById('hadith-content');
var settings_panel = document.getElementById('settings-panel');
var dateContent    = document.getElementById('dateContent');

const localDate = localStorage.getItem('dateType');

// var rand = Math.floor((Math.random() * 1896) + 1);
var rand = 1;

$(document).ready(function(){
    $.getJSON('files/hadith.json' , function(data){
        hadith.innerHTML = data.AllChapters[rand].Ar_Sanad_1 + data.AllChapters[rand].Ar_Text;
    });

    $.getJSON('files/hadithen.json' , function(dataen){
        translation.innerHTML = dataen.AllChapters[rand].En_Sanad + dataen.AllChapters[rand].En_Text;
    });

    
    // Start Next
    

    $('#next').click(()=>{
        
    });

    
    // End Next




    // Srart Translation

    $('#translate').click(function() { 
        $('.translation').css('top', '20%')
    });
    
    $('.btn-close').click(function() { 
        $('.translation').css('top', '-200%')
    });

    // End Translation




    // Start Settings

    $('#settings-show').click(function(){
        $('#settings-panel').toggle();
    });

    // End Settings

    // Start Prayer times

    var prayerItem = document.getElementById('prayerItem');

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://aladhan.p.rapidapi.com/timingsByCity?city=cairo&country=eg",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "802af0a108mshb84cc934cb88ff9p196f99jsn042288abcbc8",
            "x-rapidapi-host": "aladhan.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        $('#prayerItem').text(response.data.timings.Fajr);
        $('#prayerItem').text(response.data.timings.Dhuhr);
        $('#prayerItem').text(response.data.timings.Asr);
        $('#prayerItem').text(response.data.timings.Maghrib);
        $('#prayerItem').text(response.data.timings.Isha);
    });

    // End Prayer times


    
    
});

    // Start Date
    const date = new Date();
    var hegryDate = date.toLocaleDateString("ar-SA", {
        weekday: "long",
        month  : "long",
        day    : "numeric",
        year   : "numeric"
    });

    var meladyDate = date.toLocaleDateString("ar-EG", {
        weekday: "long",
        month  : "long",
        day    : "numeric",
        year   : "numeric"
    });

    

    var changeDate = document.getElementById('changeDate');

    
    if(localDate == 'hegry' ) setHegry();
    if(localDate == 'melady') setMelady();


    changeDate.addEventListener('click', function(){

        if(changeDate.getAttribute('isActive') == 'false')
        {
            setHegry();
        }
        else
        {   
            setMelady();
        }
    });

    function setHegry(){
        changeDate.classList.add('toggle-active');
        changeDate.setAttribute('isActive', 'true');
        dateContent.innerHTML = hegryDate;
        localStorage.setItem('dateType', 'hegry');
    }

    function setMelady() {
        changeDate.setAttribute('isActive', 'false');
        dateContent.innerHTML = meladyDate;
        localStorage.setItem('dateType', 'melady');
        changeDate.classList.remove('toggle-active');
    }

    

    // End Date




