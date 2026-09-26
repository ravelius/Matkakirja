using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace Matkakirja
{
    /// <summary>
    /// 3D-symbolinostojen arkkityypit (löydös 160, omistajan linjaus 26.9. kohta 11: sama kirjasto tasoille 1–3). Mallit
    /// ovat Symbolimallit.Arkkityypit.cs:ssä; puuttuva laji → yleinen merkkikivi. Järjestys = mallitaulukon indeksi.
    /// </summary>
    public enum Arkkityyppi
    {
        Merkkikivi, Temppeli, Kirkko, Luostari, Linna, Kaupunginmuuri, Majakka, Silta, Mylly, Satama, Luola, Muistomerkki,
        Raunio, Kaupunkitalo, Vuori,
    }

    /// <summary>
    /// NOSTO → ARKKITYYPPI puhtaana funktiona (ilman UnityEngineä; Kartta-testit/ArkkityyppiKartoitusTestit).
    /// Pelikoodarin ehdotus proto-3d/lokit/loydos160-arkkityypit.txt (data v153, 2963 alkiota):
    ///   1) KIINTEÄ TAULU tason 1 id:ille (185 riviä). Merkinnät: P = Pelikoodarin ehdotus sellaisenaan (kirkko/luostari
    ///      jaettu nimen mukaan), K = Pelikoodarin käsin korjaama (Delfoi, Knossos, Olympia, Santorini), N = Natiivisepän
    ///      tarkennus: uudet arkkityypit (majakka, silta, mylly, luola, muistomerkki, kaupunkitalo), joita ehdotuksessa ei
    ///      vielä ollut, ja rivit, joilla lajin oletus osui huonosti (esim. palatsit raunioina, luolat vuorina). Pelikoodari
    ///      tarkistaa N-rivit.
    ///   2) NIMISÄÄNTÖ (järjestyksessä, ensimmäinen osuma voittaa; kirjainkoko ei ratkaise): Pelikoodarin säännöt, joihin
    ///      on lisätty uusien arkkityyppien sanat; luostari erotettu kirkosta ja majakka satamasta.
    ///   3) LAJIN OLETUS (laji, datassa puuttuessa kategoria): vuori → vuori, merenkulku → satama, historia → raunio
    ///      (Pelikoodari) ja kaupunki → kaupunkitalo (Natiiviseppä).
    ///   4) muu → merkkikivi.
    /// </summary>
    public static class ArkkityyppiKartoitus
    {
        public const int Lukumaara = (int)Arkkityyppi.Vuori + 1;

        public enum Peruste { Taulu, Nimi, Laji, Kategoria, Oletus }

        /// <summary>Arkkityyppi nostolle: id (Nosto.Id, esim. "kohde:akropolis"), nimi, kategoria ja laji (null sallittu).</summary>
        public static Arkkityyppi Kartoita(string id, string nimi, string kategoria, string laji) =>
            Kartoita(id, nimi, kategoria, laji, out _);

        public static Arkkityyppi Kartoita(string id, string nimi, string kategoria, string laji, out Peruste peruste)
        {
            if (id != null && Taso1.TryGetValue(id, out var a)) { peruste = Peruste.Taulu; return a; }
            if (!string.IsNullOrEmpty(nimi))
                foreach (var (saanto, tyyppi) in Nimisaannot)
                    if (saanto.IsMatch(nimi)) { peruste = Peruste.Nimi; return tyyppi; }
            if (laji != null && LajinOletus.TryGetValue(laji, out a)) { peruste = Peruste.Laji; return a; }
            if (kategoria != null && LajinOletus.TryGetValue(kategoria, out a)) { peruste = Peruste.Kategoria; return a; }
            peruste = Peruste.Oletus;
            return Arkkityyppi.Merkkikivi;
        }

        /// <summary>Onko id kiinteässä tason 1 taulussa.</summary>
        public static bool Taulussa(string id) => id != null && Taso1.ContainsKey(id);

        /// <summary>Tason 1 rivien määrä (testi).</summary>
        public static int TaulunRiveja => Taso1.Count;

        static Regex S(string kuvio) => new Regex(kuvio, RegexOptions.IgnoreCase | RegexOptions.CultureInvariant);

        /// <summary>Nimisäännöt järjestyksessä (Pelikoodarin säännöt + uudet arkkityypit, ks. luokan kuvaus).</summary>
        static readonly (Regex, Arkkityyppi)[] Nimisaannot =
        {
            (S(@"temppel|temple|pyramid|pagod|stupa|zigguraat|oraakkel|pyhäkkö|akropol|parthenon|pantheon"), Arkkityyppi.Temppeli),
            (S(@"luostar|abbey|abbaye|abtei|kloster|klooster|priory|meteora|athos"), Arkkityyppi.Luostari),
            (S(@"kirkko|katedraal|tuomiokirk|basilik|kappel|moskei|synago|minster|dom\b"), Arkkityyppi.Kirkko),
            (S(@"linna|linnoit|kastro|kreml|palats|citadel|alcázar|alcazar|fort\b|festning|borg\b|château|schloss"), Arkkityyppi.Linna),
            (S(@"muuri|portti|muurit|valli"), Arkkityyppi.Kaupunginmuuri),
            (S(@"majakk|lighthouse|leuchtturm|\bfyr\b|\bfaro\b"), Arkkityyppi.Majakka),
            (S(@"silta|\bsilla|bridge|brücke|brucke|\bpont\b|\bmost\b|akvedukt|viadukt"), Arkkityyppi.Silta),
            (S(@"mylly|windmill|\bmill\b|molen"), Arkkityyppi.Mylly),
            (S(@"satama|laituri|kanava|telakka|port\b|harbour"), Arkkityyppi.Satama),
            (S(@"luola|grotto|grotta|\bcave\b|höhle|jaskini"), Arkkityyppi.Luola),
            (S(@"muistomerk|monument|memorial|obelisk|patsas|mausole|\bristi|kivet\b|kumpu"), Arkkityyppi.Muistomerkki),
            (S(@"raunio|rauniot|amfiteatter|areena|teatteri|forum|agora|nekropol|hauta|antiikin|muinais"), Arkkityyppi.Raunio),
            (S(@"raatihuone|kaupungintalo|town ?hall|rathaus|stadhuis|belfry|kellotapuli|vanha ?kaupunki"), Arkkityyppi.Kaupunkitalo),
            (S(@"vuori|vuoret|tunturi|tulivuor|kraatteri|huippu|massiivi|rotko"), Arkkityyppi.Vuori),
        };

        /// <summary>Lajin (tai kategorian) oletus: Pelikoodarin kolme + kaupunki → kaupunkitalo.</summary>
        static readonly Dictionary<string, Arkkityyppi> LajinOletus = new Dictionary<string, Arkkityyppi>(StringComparer.Ordinal)
        {
            ["vuori"] = Arkkityyppi.Vuori,
            ["merenkulku"] = Arkkityyppi.Satama,
            ["historia"] = Arkkityyppi.Raunio,
            ["kaupunki"] = Arkkityyppi.Kaupunkitalo,
        };

        /// <summary>Tason 1 kiinteä taulu (185 riviä, maittain; P/K/N kuten luokan kuvauksessa).</summary>
        static readonly Dictionary<string, Arkkityyppi> Taso1 = new Dictionary<string, Arkkityyppi>(StringComparer.Ordinal)
        {
            // AUT
            ["kohde:groglockner"] = Arkkityyppi.Vuori, // P Großglockner
            ["kohde:hallstatt"] = Arkkityyppi.Kaupunkitalo, // N Hallstatt
            ["kohde:hohensalzburg"] = Arkkityyppi.Linna, // P Hohensalzburgin linnoitus
            ["kohde:melkin-luostari"] = Arkkityyppi.Luostari, // P Melkin luostari
            ["kohde:semmeringin-rata"] = Arkkityyppi.Silta, // N Semmeringin rata
            ["kohde:tonava"] = Arkkityyppi.Merkkikivi, // P Tonava
            // BEL
            ["kohde:hahmotelma-brugge-belfry"] = Arkkityyppi.Kaupunkitalo, // N Bruggen Belfry
            ["kohde:hahmotelma-canal-du-centre"] = Arkkityyppi.Satama, // N Canal du Centren laivanostimet
            ["kohde:hahmotelma-chimay"] = Arkkityyppi.Luostari, // N Chimay
            ["kohde:hahmotelma-high-fens"] = Arkkityyppi.Vuori, // P Hautes Fagnes
            ["kohde:hahmotelma-lions-mound"] = Arkkityyppi.Muistomerkki, // N Waterloon leijonakumpu
            ["kohde:hahmotelma-menin-gate"] = Arkkityyppi.Muistomerkki, // N Menin Gate
            // BGR
            ["kohde:jogurtti"] = Arkkityyppi.Merkkikivi, // P Bulgarialainen jogurtti
            ["kohde:musala"] = Arkkityyppi.Vuori, // P Musala
            ["kohde:nesebar"] = Arkkityyppi.Kirkko, // N Nesebar
            ["kohde:rilan-luostari"] = Arkkityyppi.Luostari, // P Rilan luostari
            // BIH
            ["kohde:mostar"] = Arkkityyppi.Silta, // N Mostar
            ["kohde:una"] = Arkkityyppi.Merkkikivi, // P Una-joki
            ["kohde:visegrad"] = Arkkityyppi.Silta, // N Višegrad
            ["kohde:vjetrenica"] = Arkkityyppi.Luola, // N Vjetrenican luola
            // CHE
            ["kohde:chillon"] = Arkkityyppi.Linna, // P Chillonin linna
            ["kohde:gruyeres"] = Arkkityyppi.Linna, // N Gruyères
            ["kohde:hahmotelma-cern"] = Arkkityyppi.Merkkikivi, // P CERN
            ["kohde:kapellbrucke"] = Arkkityyppi.Silta, // N Kapellbrücke
            ["kohde:matterhorn"] = Arkkityyppi.Vuori, // P Matterhorn
            ["kohde:reininputous"] = Arkkityyppi.Merkkikivi, // P Reininputous
            // CYP
            ["kohde:hahmotelma-akamas"] = Arkkityyppi.Vuori, // P Akamas
            ["kohde:hahmotelma-famagusta"] = Arkkityyppi.Kaupunginmuuri, // N Famagusta
            ["kohde:hahmotelma-kyrenia"] = Arkkityyppi.Linna, // N Kyrenia
            ["kohde:kourion"] = Arkkityyppi.Raunio, // P Kourion
            // CZE
            ["kohde:cesky-krumlov"] = Arkkityyppi.Linna, // N Český Krumlov
            ["kohde:hahmotelma-karlovy-vary"] = Arkkityyppi.Kaupunkitalo, // N Karlovy Vary
            ["kohde:kutna-hora"] = Arkkityyppi.Kirkko, // N Kutná Hora
            ["kohde:plzensky-prazdroj"] = Arkkityyppi.Merkkikivi, // P Plzeňský Prazdroj
            ["kohde:snezka"] = Arkkityyppi.Vuori, // P Sněžka
            ["kohde:vltava"] = Arkkityyppi.Merkkikivi, // P Vltava
            // DEU
            ["kohde:brandenburgin-portti"] = Arkkityyppi.Kaupunginmuuri, // P Brandenburgin portti
            ["kohde:hahmotelma-hameln"] = Arkkityyppi.Kaupunkitalo, // N Hameln
            ["kohde:hahmotelma-rothenburg"] = Arkkityyppi.Kaupunginmuuri, // N Rothenburg ob der Tauber
            ["kohde:kolnin-tuomiokirkko"] = Arkkityyppi.Kirkko, // P Kölnin tuomiokirkko
            ["kohde:rein~2"] = Arkkityyppi.Merkkikivi, // P Rein
            ["kohde:sanssouci"] = Arkkityyppi.Linna, // N Sanssouci
            ["kohde:wartburg"] = Arkkityyppi.Linna, // N Wartburg
            ["kohde:zugspitze"] = Arkkityyppi.Vuori, // P Zugspitze
            // DNK
            ["kohde:billund"] = Arkkityyppi.Merkkikivi, // P Billund
            ["kohde:hahmotelma-odense"] = Arkkityyppi.Kaupunkitalo, // N Odense
            ["kohde:jellingin-kivet"] = Arkkityyppi.Muistomerkki, // N Jellingin kivet
            ["kohde:kronborg"] = Arkkityyppi.Linna, // P Kronborg
            ["kohde:mons-klint"] = Arkkityyppi.Vuori, // P Møns Klint
            ["kohde:skagen"] = Arkkityyppi.Majakka, // N Skagen
            // ESP
            ["kohde:altamiran-luola"] = Arkkityyppi.Luola, // N Altamiran luola
            ["kohde:cordoban-moskeijakatedraali"] = Arkkityyppi.Kirkko, // P Córdoban moskeijakatedraali
            ["kohde:hahmotelma-el-escorial"] = Arkkityyppi.Luostari, // N El Escorial
            ["kohde:hahmotelma-picos-de-europa"] = Arkkityyppi.Vuori, // P Picos de Europa
            ["kohde:hahmotelma-ronda"] = Arkkityyppi.Silta, // N Ronda
            ["kohde:santiago-de-compostela"] = Arkkityyppi.Kirkko, // N Santiago de Compostela
            ["kohde:segovian-akvedukti"] = Arkkityyppi.Silta, // N Segovian akvedukti
            ["kohde:toledo"] = Arkkityyppi.Linna, // N Toledo
            // EST
            ["kohde:kihnu"] = Arkkityyppi.Merkkikivi, // P Kihnu
            ["kohde:kuressaaren-linna"] = Arkkityyppi.Linna, // P Kuressaaren linna
            ["kohde:peipsi"] = Arkkityyppi.Merkkikivi, // P Peipsijärvi
            ["kohde:suurmunamagi"] = Arkkityyppi.Vuori, // P Suur Munamägi
            // FIN
            ["kohde:hahmotelma-merenkurkku"] = Arkkityyppi.Merkkikivi, // P Merenkurkun saaristo
            ["kohde:halti"] = Arkkityyppi.Vuori, // P Halti
            ["kohde:olavinlinna"] = Arkkityyppi.Linna, // P Olavinlinna
            ["kohde:saimaa"] = Arkkityyppi.Merkkikivi, // P Saimaa
            ["kohde:turunlinna"] = Arkkityyppi.Linna, // P Turun linna
            ["kohde:verla"] = Arkkityyppi.Mylly, // N Verla
            // FRA
            ["kohde:carcassonnen-linnoituskaupunki"] = Arkkityyppi.Linna, // P Carcassonnen linnoituskaupunki
            ["kohde:chambord"] = Arkkityyppi.Linna, // P Chambordin linna
            ["kohde:hahmotelma-etretat"] = Arkkityyppi.Vuori, // N Étretat
            ["kohde:lascaux"] = Arkkityyppi.Luola, // N Lascaux
            ["kohde:mont-saint-michel"] = Arkkityyppi.Luostari, // N Mont-Saint-Michel
            ["kohde:montblanc"] = Arkkityyppi.Vuori, // P Mont Blanc
            ["kohde:pont-du-gard"] = Arkkityyppi.Silta, // N Pont du Gard
            ["nosto:maalehti-peilisali"] = Arkkityyppi.Linna, // N Peilisali
            // GBR
            ["kohde:bathin-roomalaiset-kylpylat"] = Arkkityyppi.Raunio, // N Bathin roomalaiset kylpylät
            ["kohde:bennevis"] = Arkkityyppi.Vuori, // P Ben Nevis
            ["kohde:hahmotelma-dover-strait"] = Arkkityyppi.Vuori, // P Doverin liiduvuoret
            ["kohde:hahmotelma-edinburgh-castle"] = Arkkityyppi.Linna, // P Edinburghin linna
            ["kohde:ironbridge"] = Arkkityyppi.Silta, // N Ironbridge
            ["kohde:stonehenge"] = Arkkityyppi.Raunio, // P Stonehenge
            // GRC
            ["kohde:akropolis"] = Arkkityyppi.Temppeli, // P Akropolis
            ["kohde:delfoi"] = Arkkityyppi.Temppeli, // K Delfoi
            ["kohde:hahmotelma-meteora"] = Arkkityyppi.Luostari, // P Meteora
            ["kohde:knossos"] = Arkkityyppi.Raunio, // K Knossoksen palatsi
            ["kohde:olympia"] = Arkkityyppi.Raunio, // K Olympia
            ["kohde:santorini"] = Arkkityyppi.Vuori, // K Santoríni
            // HRV
            ["kohde:hvar"] = Arkkityyppi.Merkkikivi, // P Hvar
            ["kohde:plitvicen-jarvet"] = Arkkityyppi.Merkkikivi, // P Plitvicen järvet
            ["kohde:pulan-areena"] = Arkkityyppi.Raunio, // P Pulan areena
            ["kohde:stonin-muurit"] = Arkkityyppi.Kaupunginmuuri, // P Stonin muurit
            // HUN
            ["kohde:balaton"] = Arkkityyppi.Merkkikivi, // P Balaton
            ["kohde:eger"] = Arkkityyppi.Linna, // N Eger
            ["kohde:hortobagy"] = Arkkityyppi.Merkkikivi, // N Hortobágy
            ["kohde:kekes"] = Arkkityyppi.Vuori, // P Kékes
            ["kohde:pannonhalma"] = Arkkityyppi.Luostari, // N Pannonhalma
            ["kohde:tokaj"] = Arkkityyppi.Merkkikivi, // P Tokaj
            // IRL
            ["kohde:hahmotelma-blarney"] = Arkkityyppi.Linna, // N Blarney
            ["kohde:hahmotelma-cobh"] = Arkkityyppi.Satama, // P Cobh (Queenstown)
            ["kohde:hahmotelma-killarney"] = Arkkityyppi.Merkkikivi, // P Killarney
            ["kohde:moherin-kalliot"] = Arkkityyppi.Vuori, // P Moherin kalliot
            ["kohde:newgrange"] = Arkkityyppi.Raunio, // P Newgrange
            ["kohde:skellig-michael"] = Arkkityyppi.Luostari, // N Skellig Michael
            // ISL
            ["kohde:geysir"] = Arkkityyppi.Merkkikivi, // P Geysir
            ["kohde:hahmotelma-blaa-lonid"] = Arkkityyppi.Merkkikivi, // P Sinilóni
            ["kohde:hahmotelma-reynisfjara"] = Arkkityyppi.Merkkikivi, // P Reynisfjara
            ["kohde:thingvellir"] = Arkkityyppi.Raunio, // P Þingvellir
            // ITA
            ["kohde:capri"] = Arkkityyppi.Luola, // N Capri ja Sininen luola
            ["kohde:cinque-terre"] = Arkkityyppi.Kaupunkitalo, // N Cinque Terre
            ["kohde:colosseum"] = Arkkityyppi.Raunio, // N Colosseum
            ["kohde:dolomiitit"] = Arkkityyppi.Vuori, // P Dolomiitit
            ["kohde:etna"] = Arkkityyppi.Vuori, // P Etna
            ["kohde:pisa"] = Arkkityyppi.Kirkko, // N Pisa
            ["kohde:pompeji"] = Arkkityyppi.Raunio, // P Pompeji
            ["kohde:vesuvius"] = Arkkityyppi.Vuori, // P Vesuvius
            // LTU
            ["kohde:grutas-puisto"] = Arkkityyppi.Muistomerkki, // N Grūtasin puisto
            ["kohde:kuurinkynnas"] = Arkkityyppi.Vuori, // P Kuurinkynnäs
            ["kohde:ristien-kukkula"] = Arkkityyppi.Muistomerkki, // N Ristien kukkula
            ["kohde:trakain-saarilinna"] = Arkkityyppi.Linna, // P Trakain saarilinna
            // LUX
            ["kohde:hahmotelma-echternach"] = Arkkityyppi.Luostari, // N Echternach
            ["kohde:hahmotelma-esch"] = Arkkityyppi.Merkkikivi, // P Esch-sur-Alzette
            ["kohde:hahmotelma-luxembourg"] = Arkkityyppi.Linna, // N Luxembourgin kaupunki
            ["kohde:hahmotelma-vianden"] = Arkkityyppi.Linna, // P Viandenin linna
            // LVA
            ["kohde:hahmotelma-jurmala"] = Arkkityyppi.Kaupunkitalo, // N Jūrmala
            ["kohde:rundale"] = Arkkityyppi.Linna, // P Rundālen palatsi
            ["kohde:turaidan-ruusu"] = Arkkityyppi.Linna, // N Turaidan ruusu
            ["kohde:ventas-rumba"] = Arkkityyppi.Merkkikivi, // P Ventas rumba
            // MLT
            ["kohde:hahmotelma-blue-grotto"] = Arkkityyppi.Luola, // N Sininen luola
            ["kohde:hahmotelma-comino"] = Arkkityyppi.Merkkikivi, // P Comino
            ["kohde:hahmotelma-hagar-qim"] = Arkkityyppi.Raunio, // P Ħaġar Qim
            ["kohde:hahmotelma-mdina"] = Arkkityyppi.Kaupunginmuuri, // N Mdina
            // NLD
            ["kohde:afsluitdijk"] = Arkkityyppi.Silta, // N Afsluitdijk
            ["kohde:giethoorn"] = Arkkityyppi.Kaupunkitalo, // N Giethoorn
            ["kohde:hahmotelma-gouda"] = Arkkityyppi.Kaupunkitalo, // N Gouda
            ["kohde:hahmotelma-keukenhof"] = Arkkityyppi.Mylly, // N Keukenhof
            ["kohde:hahmotelma-kinderdijk"] = Arkkityyppi.Mylly, // N Kinderdijkin myllyt
            ["kohde:vredespaleis"] = Arkkityyppi.Linna, // N Vredespaleis
            // NOR
            ["kohde:hahmotelma-geirangerfjord"] = Arkkityyppi.Vuori, // N Geirangervuono
            ["kohde:hahmotelma-lofoten"] = Arkkityyppi.Vuori, // N Lofootit
            ["kohde:hahmotelma-preikestolen"] = Arkkityyppi.Vuori, // P Preikestolen
            ["kohde:hahmotelma-trollstigen"] = Arkkityyppi.Vuori, // N Trollstigen
            ["kohde:nidaros"] = Arkkityyppi.Kirkko, // P Nidarosin tuomiokirkko
            ["kohde:nordkapp"] = Arkkityyppi.Majakka, // N Nordkapp
            // POL
            ["kohde:auschwitz"] = Arkkityyppi.Muistomerkki, // N Auschwitz-Birkenau
            ["kohde:elblaginkanava"] = Arkkityyppi.Satama, // P Elblągin kanava
            ["kohde:hahmotelma-bialowieza"] = Arkkityyppi.Merkkikivi, // P Białowieżan metsä
            ["kohde:hahmotelma-slowinski"] = Arkkityyppi.Merkkikivi, // P Słowińskin dyynit
            ["kohde:malbork"] = Arkkityyppi.Linna, // P Malborkin linna
            ["kohde:rysy"] = Arkkityyppi.Vuori, // P Rysy
            // PRT
            ["kohde:batalha"] = Arkkityyppi.Luostari, // P Batalhan luostari
            ["kohde:douro"] = Arkkityyppi.Merkkikivi, // P Douro
            ["kohde:elvas"] = Arkkityyppi.Kaupunginmuuri, // N Elvas
            ["kohde:saovicente"] = Arkkityyppi.Majakka, // N São Vicenten niemi
            ["kohde:sintra"] = Arkkityyppi.Linna, // N Sintra
            ["kohde:torre"] = Arkkityyppi.Vuori, // P Torre
            // ROU
            ["kohde:bran"] = Arkkityyppi.Linna, // P Branin linna
            ["kohde:peles"] = Arkkityyppi.Linna, // P Peleșin linna
            ["kohde:tonavan-suisto"] = Arkkityyppi.Merkkikivi, // P Tonavan suisto
            ["kohde:transfagarasan"] = Arkkityyppi.Vuori, // N Transfăgărășan
            // RUS
            ["kohde:elbrus"] = Arkkityyppi.Vuori, // P Elbrus
            ["kohde:hahmotelma-peterhof"] = Arkkityyppi.Linna, // N Peterhof
            ["kohde:kizhin-pogosta"] = Arkkityyppi.Kirkko, // N Kizhin pogosta
            ["kohde:volga"] = Arkkityyppi.Merkkikivi, // P Volga
            // SVK
            ["kohde:hahmotelma-banska-stiavnica"] = Arkkityyppi.Kaupunkitalo, // N Banská Štiavnica
            ["kohde:hahmotelma-bojnice"] = Arkkityyppi.Linna, // P Bojnicen linna
            ["kohde:hahmotelma-spis"] = Arkkityyppi.Linna, // P Spišin linna
            ["kohde:hahmotelma-tatranska-lomnica"] = Arkkityyppi.Vuori, // P Tatranská Lomnica
            // SVN
            ["kohde:hahmotelma-bled"] = Arkkityyppi.Kirkko, // N Bledinjärvi
            ["kohde:hahmotelma-piran"] = Arkkityyppi.Kaupunkitalo, // N Piran
            ["kohde:hahmotelma-postojna"] = Arkkityyppi.Luola, // N Postojnan luola
            ["kohde:hahmotelma-triglav"] = Arkkityyppi.Vuori, // P Triglav
            // SWE
            ["kohde:birka"] = Arkkityyppi.Raunio, // N Birka
            ["kohde:kebnekaise"] = Arkkityyppi.Vuori, // P Kebnekaise
            ["kohde:kiruna"] = Arkkityyppi.Merkkikivi, // P Kiruna
            ["kohde:vanern"] = Arkkityyppi.Merkkikivi, // P Vänern
            ["kohde:visby"] = Arkkityyppi.Kaupunginmuuri, // N Visby
            // TUR
            ["kohde:efesos"] = Arkkityyppi.Raunio, // P Efesos
            ["kohde:kappadokia"] = Arkkityyppi.Vuori, // P Kappadokia
            ["kohde:pamukkale"] = Arkkityyppi.Vuori, // P Pamukkale ja Hierapolis
            ["kohde:troija"] = Arkkityyppi.Raunio, // P Troija
            // UKR
            ["kohde:hahmotelma-bakhchysarai"] = Arkkityyppi.Linna, // P Bakhchysarain palatsi
            ["kohde:kamjanets-podilskyin-linna"] = Arkkityyppi.Linna, // P Kamjanets-Podilskyin linna
            ["kohde:lviv"] = Arkkityyppi.Kaupunkitalo, // N Lviv
            ["kohde:tsernobylin-ydinvoimala"] = Arkkityyppi.Merkkikivi, // P Tšernobylin ydinvoimala
        };
    }
}
