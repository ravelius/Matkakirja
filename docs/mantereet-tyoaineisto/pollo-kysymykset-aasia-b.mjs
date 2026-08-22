/*
 * PÖLLÖN VALMISKYSYMYKSET — AASIA, ERÄ B (19 kaupunkia).
 *
 * Muoto ja taso: js/packs/pollo-kysymykset.js (pilotit tokio ja kairo).
 * Jokaisella kaupungilla täsmälleen 5 + 5 kysymystä:
 *   laatta — kaupunkilaatta kartalla, yleisempi taso
 *   lehti  — kaupungin lehti auki, syventävä taso lehden sisällöstä
 *
 * Säännöt: suomeksi, pelaajan äänellä, enintään 70 merkkiä, aiheet
 * pelin omasta aineistosta (js/packs/kulttuuri-kategoriat.js ja
 * js/packs/nahtavyysjutut.js). Ei kaupungin kulttuurivisan vastauksia
 * (js/packs/asia-questions.js) eikä lehden minitehtävän vastauksia,
 * ei juonispoilereita.
 *
 * HERKÄT KOHTEET (docs/aasia-tyoaineisto/spec-asia.md, sitova):
 * Lhasa ja Kašgar — kulttuuri, uskonto ja historia, ei nykyhallintoa;
 * Yangon ja Mandalay — 1800-luvun Burma, ei nykypolitiikkaa;
 * Kabul — 1800-luvun historia, kulttuuri ja arki, ei nykykonfliktia;
 * Varanasi — pyhyys kunnioittavasti.
 */

export const LOHKO = {
  bangkok: {
    laatta: [
      'Miksi Bangkokia sanottiin idän Venetsiaksi?',
      'Miksi moni Bangkokin kanava täytettiin kaduiksi?',
      'Kuka oli kuningas Chulalongkorn?',
      'Miten Siam säilyi itsenäisenä siirtomaavallan aikana?',
      'Miksi katukeittiöt ovat Bangkokissa niin tavallisia?',
    ],
    lehti: [
      'Miksi Rama I siirsi pääkaupungin joen itärannalle?',
      'Miten orjuus lakkautettiin Siamissa?',
      'Mistä Wat Arunin posliinikoristeet ovat peräisin?',
      'Mikä Sao Ching Cha eli jättiläiskeinu oli?',
      'Miksi Wat Phossa opetetaan hierontaa?',
    ],
  },

  yangon: {
    laatta: [
      'Miksi Yangonin keskustassa on numeroituja katuja?',
      'Kuinka korkea Shwedagon-pagodi on?',
      'Millainen kaupunki Yangon oli ennen brittejä?',
      'Miksi Yangon kasvoi juuri joen suistoon?',
      'Miksi pagodeja peitetään kultalehdellä?',
    ],
    lehti: [
      'Ketkä perustivat Dagonin kylän Shwedagonin juurelle?',
      'Miksi britit pitivät Shwedagonia linnoituksenaan?',
      'Miten Shwedagonin suuri kello nostettiin joesta?',
      'Miksi Botataung-pagodi on sisältä ontto?',
      'Ketkä veljekset omistivat Strand-hotellin?',
    ],
  },

  mandalay: {
    laatta: [
      'Miksi Mandalay rakennettiin täsmällisen neliön muotoon?',
      'Mitä profetia lupasi Mandalay-kukkulan juurelle?',
      'Kuinka leveä palatsin vallihauta on?',
      'Miksi kaupunki sai nimensä kukkulalta?',
      'Millaista elämä burmalaisessa luostarissa on?',
    ],
    lehti: [
      'Mikä on maailman suurin kirja, ja missä se on?',
      'Miksi Mindon lähetti oppilaita Eurooppaan?',
      'Kuka rakennutti U Bein -sillan ja milloin?',
      'Miksi Shwenandaw-luostari siirrettiin palatsista pois?',
      'Mistä Mahamuni-temppelin Buddha-kuva tuotiin?',
    ],
  },

  singapore: {
    laatta: [
      'Kuka oli Stamford Raffles?',
      'Miksi Singaporen satamassa ei peritty tullia?',
      'Miten saaren väkiluku kasvoi tuhannesta 1800-luvulla?',
      'Miksi kaupunki jaettiin kansanryhmien kortteleihin?',
      'Mitä kieliä Singaporessa puhutaan?',
    ],
    lehti: [
      'Mikä oli Jackson-suunnitelma?',
      'Kuka oli Naraina Pillai?',
      'Miksi Cavenagh-silta jäi liian matalaksi?',
      'Millainen paikka Boat Quay oli 1860-luvulla?',
      'Mistä Merlion-hahmo on peräisin?',
    ],
  },

  sumatra: {
    laatta: [
      'Kuinka suuri saari Sumatra on?',
      'Miksi Sumatralla on niin paljon tulivuoria?',
      'Mikä oli Acehin sulttaanikunta?',
      'Miksi pippuri teki Sumatrasta rikkaan?',
      'Miksi Sumatralla tuntuu usein maanjäristyksiä?',
    ],
    lehti: [
      'Kuinka kauas Krakataun räjähdys kuului vuonna 1883?',
      'Miksi Toba-järvi on oikeastaan romahtanut kuoppa?',
      'Miten sumatrantiikeri eroaa muista tiikereistä?',
      'Mikä on titaanivehka eli maailman suurin kukinto?',
      'Kuinka paljon Sumatran sademetsää on hävinnyt?',
    ],
  },

  borneo: {
    laatta: [
      'Keitä olivat Borneon valkoiset radžat?',
      'Ketkä ovat dajakit?',
      'Mistä Borneo sai nimensä?',
      'Mitä Borneolta vietiin kauppatavarana vanhastaan?',
      'Miksi päiväntasaaja tekee Borneosta niin sateisen?',
    ],
    lehti: [
      'Mitä Alfred Russel Wallace teki Sarawakissa?',
      'Miksi sademetsää sanotaan dinosaurusten ikäiseksi?',
      'Miten liitävä sammakko liikkuu puiden välillä?',
      'Miksi Kinabalun huipulla kasvaa omia lajejaan?',
      'Kuinka suuri borneonoranki on?',
    ],
  },

  jakarta: {
    laatta: [
      'Miksi Jakarta on vaihtanut nimeä neljästi?',
      'Millainen kaupunki Batavia oli?',
      'Mikä oli VOC eli Hollannin Itä-Intian kauppakomppania?',
      'Mitä Kota Tua eli vanhakaupunki on?',
      'Miksi hollantilaiset kaivoivat Bataviaan kanavia?',
    ],
    lehti: [
      'Mitä Fatahillah-aukion vanha kaupungintalo oli?',
      'Kuka rakennutti Toko Merahin punaisen talon?',
      'Millaisia laivoja Sunda Kelapaan saapuu yhä?',
      'Miksi Kota Intanin nostosilta rakennettiin?',
      'Mikä on Monas, ja miksi se pystytettiin?',
    ],
  },

  lhasa: {
    laatta: [
      'Kuka rakennutti Potalan, ja miksi?',
      'Miksi Jokhangin ympäri kuljetaan myötäpäivään?',
      'Miten kaupungissa hengittää näin korkealla?',
      'Millaista oli munkkiyliopiston opiskelu?',
      'Miksi Lhasa oli 1800-luvulla suljettu kaupunki?',
    ],
    lehti: [
      'Kuka oli Songtsen Gampo?',
      'Miksi Norbulingkaa sanotaan Jalokivipuistoksi?',
      'Ketkä olivat pyhiinvaeltajiksi pukeutuneet mittamiehet?',
      'Mitä Sera-luostarin väittelyharjoituksissa tehdään?',
      'Millainen paikka Ramoche-temppeli on?',
    ],
  },

  kathmandu: {
    laatta: [
      'Mistä Kathmandu sai nimensä?',
      'Ketkä ovat newarit?',
      'Miksi Nepal oli pitkään suljettu ulkomaalaisilta?',
      'Miksi laakson taloissa on veistettyjä puuikkunoita?',
      'Miksi laaksossa on kolme Durbar-aukiota?',
    ],
    lehti: [
      'Miksi laakson uskotaan olleen ennen järvi?',
      'Ketkä olivat Rana-suvun pääministerit?',
      'Miksi Swayambhunathin stupassa on silmät?',
      'Mikä on Rani Pokhari eli Kuningattaren allas?',
      'Kuinka korkea Dharahara-torni on?',
    ],
  },

  delhi: {
    laatta: [
      'Miksi Delhi on rakennettu seitsemän kertaa?',
      'Kuka oli Shah Jahan?',
      'Mitä Chandni Chowkilla myydään?',
      'Miksi linnoitusta sanotaan Punaiseksi linnoitukseksi?',
      'Millainen valtakunta Mughal-valtakunta oli?',
    ],
    lehti: [
      'Kuka suunnitteli Chandni Chowkin kauppakadun?',
      'Mitä Jama Masjidin vanha nimi tarkoittaa?',
      'Kuka rakennutti Humayunin mausoleumin?',
      'Miten rautatie muutti Delhiä 1800-luvulla?',
      'Kuka oli Mughal-valtakunnan viimeinen keisari?',
    ],
  },

  kolkata: {
    laatta: [
      'Miksi Kolkatasta tuli juutin ja teen satama?',
      'Mikä Itä-Intian kauppakomppania oli?',
      'Miksi pääkaupunki siirrettiin Delhiin?',
      'Millaista bengalilainen ruoka on?',
      'Ketkä olivat babut?',
    ],
    lehti: [
      'Millainen oli Hooghlyn kelluva ponttonisilta?',
      'Miksi College Streetillä myydään kirjoja kadulla?',
      'Kuka rakennutti Marble Palacen?',
      'Mitä varten Writers’ Building rakennettiin?',
      'Miksi Victoria Memorial pystytettiin?',
    ],
  },

  varanasi: {
    laatta: [
      'Mikä ghat on, ja mihin niitä käytetään?',
      'Miksi pyhiinvaeltajat kylpevät Gangesissa?',
      'Mitä Banarasi-sari tarkoittaa?',
      'Miksi kaupunkia sanotaan valon kaupungiksi?',
      'Kuinka vanha kaupunki Varanasi on?',
    ],
    lehti: [
      'Mitä moksa merkitsee hindulaisessa perinteessä?',
      'Miksi Man Mandirin katolle rakennettiin tähtitorni?',
      'Miten Banarasi-brokadi kudotaan?',
      'Kuka rakennutti Ramnagarin linnoituksen?',
      'Mitä Mark Twain kirjoitti Benaresista?',
    ],
  },

  mumbai: {
    laatta: [
      'Miten seitsemästä saaresta tuli yksi niemi?',
      'Miksi Bombay rikastui puuvillasta?',
      'Milloin nimi vaihtui Bombaysta Mumbaiksi?',
      'Mistä nimi Mumbai tulee?',
      'Millaista goottilaista arkkitehtuuria kaupungissa on?',
    ],
    lehti: [
      'Mistä Intian ensimmäinen matkustajajuna lähti?',
      'Miksi Gateway of Indialle ei rakennettu tietä?',
      'Kuka oli David Sassoon?',
      'Kuinka korkea Rajabain kellotorni on?',
      'Kuka lahjoitti Crawford Marketin kaupungille?',
    ],
  },

  chennai: {
    laatta: [
      'Miksi Fort St. George rakennettiin juuri tähän?',
      'Miten Madrasista tuli Chennai?',
      'Kuinka pitkä Marina Beachin ranta on?',
      'Millaista tamililainen temppeliarkkitehtuuri on?',
      'Miksi Madrasilla ei ollut luonnonsatamaa?',
    ],
    lehti: [
      'Kuka oli Francis Day?',
      'Miksi Marina-rannasta tuli niin leveä?',
      'Milloin Etelä-Intian ensimmäinen rautatie avattiin?',
      'Kuka oli Elihu Yale?',
      'Kuinka vanha Kapaleeshwararin temppeli on?',
    ],
  },

  colombo: {
    laatta: [
      'Miksi kaneli oli Colombolle niin tärkeä?',
      'Ketkä kolme eurooppalaisvaltaa hallitsivat Colomboa?',
      'Milloin linnoituksen muurit purettiin?',
      'Mikä Galle Face on?',
      'Millaista sri lankalainen ruoka on?',
    ],
    lehti: [
      'Kuka istutti saaren ensimmäiset teepensaat?',
      'Miksi Beira-järvi kaivettiin?',
      'Miksi Fortin kellotorni odotti varastossa 43 vuotta?',
      'Millainen rakennus Wolvendaalin kirkko on?',
      'Miksi Punaista moskeijaa sanotaan punaiseksi?',
    ],
  },

  karachi: {
    laatta: [
      'Miksi Karachin satama kasvoi niin nopeasti?',
      'Millaisia kaupunginosia Karachissa on?',
      'Mikä Saddar on?',
      'Miksi vehnä kulki Karachin kautta maailmalle?',
      'Millaista arkkitehtuuria siirtomaakortteleissa on?',
    ],
    lehti: [
      'Mitä varten Frere Hall alun perin rakennettiin?',
      'Kuka oli sir William Merewether?',
      'Miksi Empress Market sai keisarinnan nimen?',
      'Kuka syntyi Wazir Mansionin talossa?',
      'Milloin Karachin ensimmäinen rautatie valmistui?',
    ],
  },

  kabul: {
    laatta: [
      'Kuka oli Babur, ja miksi hän rakasti Kabulia?',
      'Millaisia basaareja vanhassakaupungissa on?',
      'Mikä Bala Hissar on?',
      'Miksi Kabulia sanottiin Hindustanin portiksi?',
      'Millaista ruokaa Kabulin basaareissa myydään?',
    ],
    lehti: [
      'Millainen katettu basaari Char Chatta oli?',
      'Miksi Baburin puutarhat rakennettiin rinteeseen?',
      'Kuka oli Timur Shah Durrani?',
      'Mitä Afganistanin kansallismuseon kokoelmassa oli?',
      'Mikä on Ka Faroshin lintutori?',
    ],
  },

  samarkand: {
    laatta: [
      'Miksi Samarkandin rakennukset ovat sinisiä?',
      'Mikä medrese on?',
      'Miten Silkkitien karavaanit kulkivat?',
      'Kuinka vanha kaupunki Samarkand on?',
      'Millaista uzbekkiruokaa täällä syödään?',
    ],
    lehti: [
      'Kenelle Gur-e-Amir alun perin rakennettiin?',
      'Miksi Bibi-Khanymin moskeija oli liian suuri?',
      'Mikä on Shah-i-Zindan hautakuja?',
      'Mitä Afrasiyabin rauniokummun alta on löytynyt?',
      'Miksi Samarkandissa oli pitkä hiljainen kausi?',
    ],
  },

  kashgar: {
    laatta: [
      'Millainen keidaskaupunki Kašgar on?',
      'Miksi vanhakaupunki on rakennettu savitiilestä?',
      'Kuinka suuri Id Kahin moskeija on?',
      'Millaista uiguurilainen ruoka on?',
      'Miksi Silkkitien haarat kohtasivat juuri täällä?',
    ],
    lehti: [
      'Kuka oli Afaq Khoja?',
      'Mikä Chini-Bagh oli?',
      'Ketkä Macartneyt asuivat Kašgarissa?',
      'Kuka oli Yusuf Khass Hajib?',
      'Miksi Mannerheim tuli Kašgariin vuonna 1906?',
    ],
  },
};
