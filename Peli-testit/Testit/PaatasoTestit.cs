// Paketin päätason kentät (skeema 1.19, Peli/Paataso.cs): kysymykset ja pulmat luetaan samoin,
// oli kenttä päätasolla, raa'assa datassa vai molemmissa.
// Skeema 1.26 (24.9.2026): kaikki lukijat lukevat päätason ensin; raakakiellolla (Paataso.RaakaKielletty)
// päätaso yksin riittää ja pelkkä raaka data ei kelpaa.
using System;
using System.IO;
using System.Linq;
using System.Text;
using Matkakirja.Natiivi;

namespace Matkakirja.Peli.Testit
{
    static class PaatasoTestit
    {
        static string J(object o) { var sb = new StringBuilder(); Json.Kirjoita(sb, o); return sb.ToString(); }

        /// <summary>Kultaisen paketin kokoelma 1.19-muotoon: kentät päätasolle, data pois tai jätetään.</summary>
        static string Paatasolle(string json, System.Collections.Generic.IReadOnlyList<(string Uusi, string Vanha)> kentat, bool dataPois)
        {
            var o = MiniJson.Objekti(MiniJson.Jasenna(json));
            var sb = new StringBuilder("{\"nimi\":").Append(J(MiniJson.Teksti(o, "nimi"))).Append(",\"alkiot\":[");
            bool eka = true;
            foreach (var a in MiniJson.Taulukko(MiniJson.Kentta(o, "alkiot")).Select(MiniJson.Objekti))
            {
                var d = MiniJson.Objekti(a["data"]);
                var uusi = new System.Collections.Generic.Dictionary<string, object>(a);
                if (dataPois)
                {
                    uusi.Remove("data");
                    // Pulman tunnisteet ja generaattori ovat vain datassa (Siirtosepän skeema 1.19).
                    foreach (var k in new[] { "generaattori", "generate", "kuvat" }) if (d.ContainsKey(k)) uusi[k] = d[k];
                }
                foreach (var (u, v) in kentat) if (d.TryGetValue(v, out var arvo)) uusi[u] = arvo;
                if (!eka) sb.Append(',');
                eka = false;
                sb.Append(J(uusi));
            }
            return sb.Append("]}").ToString();
        }

        static string Kuvaus(Kysymys k) =>
            $"{k.Q}|{k.Vihje}|{k.Fakta}|{k.Paikka}|{string.Join(";", k.Lahteet)}|{k.Taso}|{k.Oikea}|{k.VaiteTotta}|{(k.Vaihtoehdot == null ? "-" : string.Join(";", k.Vaihtoehdot))}";

        static string Kaikki(Kysymysdata d) => string.Join("\n",
            d.Kaupungeittain.OrderBy(x => x.Key, StringComparer.Ordinal).SelectMany(x => x.Value.Select(Kuvaus))
                .Concat(d.Yleiset.Select(Kuvaus)).Concat(d.Vaitteet.Select(Kuvaus)));

        [Testi] static void KysymyksetPaatasoltaSamoinKuinDatasta()
        {
            var raaka = File.ReadAllText(Path.Combine(KultaisetApu.Paketti, "kysymykset.json"));
            var vanha = new Kysymysdata(); vanha.LueKysymykset(raaka);
            var molemmat = new Kysymysdata(); molemmat.LueKysymykset(Paatasolle(raaka, Paataso.Kysymys, false));
            var uusi = new Kysymysdata(); uusi.LueKysymykset(Paatasolle(raaka, Paataso.Kysymys, true));
            Oleta.Tosi(vanha.Vaitteet.Count > 0 && vanha.Yleiset.Count > 0, "kultaisessa paketissa on väitteitä ja yleisiä");
            Oleta.Sama(Kaikki(vanha), Kaikki(molemmat), "päätaso + data");
            Oleta.Sama(Kaikki(vanha), Kaikki(uusi), "pelkkä päätaso");
        }

        [Testi] static void PulmatPaatasoltaSamoinKuinDatasta()
        {
            var raaka = File.ReadAllText(Path.Combine(KultaisetApu.Paketti, "pulmat.json"));
            string Kuvaa(Pulmadata d) => string.Join("\n", d.Pulmat.Select(p =>
                $"{p.Id}|{p.Kaupunki}|{p.Otsikko}|{p.Selite}|{p.Kysymys}|{p.Fakta}|{p.Vihje}|{p.KuvaLahteet}|{p.Generaattori}|{string.Join(";", p.Lahteet)}|{p.Oikea}|{(p.Vaihtoehdot == null ? "-" : string.Join(";", p.Vaihtoehdot))}|{(p.Luonnos == null ? "-" : J(p.Luonnos))}"));
            var vanha = Pulmadata.Lue(raaka);
            Oleta.Tosi(vanha.Pulmat.Count == 11, "11 pulmaa");
            Oleta.Sama(Kuvaa(vanha), Kuvaa(Pulmadata.Lue(Paatasolle(raaka, Paataso.Pulma, false))), "päätaso + data");
            Oleta.Sama(Kuvaa(vanha), Kuvaa(Pulmadata.Lue(Paatasolle(raaka, Paataso.Pulma, true))), "pelkkä päätaso");
        }
    
        // --- skeema 1.26: kaikki lukijat --------------------------------------------------------

        /// <summary>Ajaa f:n raakakiellon kanssa ja palauttaa kytkimen.</summary>
        static T Kiellolla<T>(Func<T> f)
        {
            Paataso.RaakaKielletty = true;
            try { return f(); } finally { Paataso.RaakaKielletty = false; }
        }

        static string Kokoelma(string nimi, string alkiot) => "{\"nimi\":\"" + nimi + "\",\"alkiot\":[" + alkiot.Replace('\'', '"') + "]}";

        [Testi] static void ApuNakymaOlioRaaka()
        {
            var o = MiniJson.Objekti(MiniJson.Jasenna("{\"id\":\"x\",\"teksti\":null,\"kesto\":2,\"data\":{\"text\":\"raaka\",\"duration\":9,\"k\":{\"q\":\"?\"}}}"));
            var n = Paataso.Nakyma(o, new[] { ("teksti", "text"), ("kesto", "duration") });
            Oleta.Sama("raaka", MiniJson.Teksti(n, "teksti"), "päätason null täydentyy raa'asta");
            Oleta.Sama(2.0, MiniJson.Luku(n, "kesto"), "päätaso voittaa");
            Oleta.Tosi(!n.ContainsKey("data"), "näkymässä ei dataa");
            Oleta.Sama("?", MiniJson.Teksti(Paataso.Olio(o, "k", "k", new[] { ("kysymys", "q") }), "kysymys"), "raaka olio päätason nimin");
            Kiellolla(() =>
            {
                Oleta.Sama(null, MiniJson.Teksti(Paataso.Nakyma(o, new[] { ("teksti", "text") }), "teksti"), "kielto: ei raakaa");
                Oleta.Tosi(Paataso.Olio(o, "k", "k") == null && Paataso.Raaka(o) == null && Paataso.RaakaArvo(o) == null, "kielto: Olio, Raaka, RaakaArvo");
                return 0;
            });
        }

        [Testi] static void Skeema126PaatasoltaRaakakiellolla()
        {
            // Jokaisessa alkiossa päätaso JA eri arvoinen raaka data: päätason pitää voittaa sekä ilman kieltoa
            // että kiellolla; pelkkä raaka (vanha paketti) kelpaa vain ilman kieltoa.
            var reitit = Kokoelma("reitit",
                "{'id':'r0','laji':'sea','a':'x','b':'y','askelia':4,'data':{'a':'x','b':'y','type':'sea','steps':9}}," +
                "{'id':'r1','laji':'lento','a':'y','b':'z','askelia':null,'data':{'a':'y','b':'z'}}");
            var laatat = Kokoelma("laatat",
                "{'id':'tokens','maarat':{'star':2,'pieniAarre':3},'tyypit':{'pieniAarre':{'name':'Uusi'}},'mannerTyypit':{'europe':{'pieniAarre':{'name':'Meripihka'}}}," +
                "'data':{'counts':{'star':9},'types':{'pieniAarre':{'name':'Vanha'}},'mannerTypes':{}}}");
            var kaari = Kokoelma("tarinakaari",
                "{'id':'praha','kaupunki':'praha','nimi':'Tomáš','kohtaaminen':'K','aarre':'A','tunneAarre':{'tunne':'ilo','voimakkuus':0.6}," +
                "'kysymys':{'kysymys':'Q?','vaihtoehdot':['a','b'],'oikea':1,'fakta':'F'},'data':{'nimi':'V','kohtaaminen':'V','kysymys':{'q':'V?','vaihtoehdot':['v'],'oikea':0}}}");
            var paikat = Kokoelma("paikkatiedot",
                "{'id':'p:0','kaupunki':'praha','data':'vanha','teksti':'uusi','aani':null,'lahde':null,'wiki':null}," +
                "{'id':'p:1','kaupunki':'praha','data':{'text':'v','voice':'isoisa'},'teksti':'t','aani':'isoisa','lahde':'L','wiki':null}");
            var kohtaamiset = Kokoelma("kohtaamiset",
                "{'id':'praha','kaupunki':'praha','tervehdys':'T','loyto':'L','tyhja':'Y','vaarin':'V','hahmo':'H','nappi':'N','kehys':'K'," +
                "'tunneLoyto':{'tunne':'ilo','voimakkuus':0.7},'data':{'tervehdys':'vanha','frame':'vanha'}}");
            var kuvat = Kokoelma("kohtaamiskuvat",
                "{'id':'k1','kaupunki':'praha','url':'https://u/1.jpg','tila':'tarkistettu','aktiivinen':null,'kohde':null,'alt':'Alt','kaytto':'tavallinen'," +
                "'data':{'kaupunki':'Praha','tila':'arkisto','alt':'vanha'}}," +
                "{'id':'k2','kaupunki':'praha','url':'https://u/2.jpg','tila':'tarkistettu','aktiivinen':false,'data':{}}");
            var paikalliset = Kokoelma("paikallisaarteet",
                "{'id':'CZE','maa':'CZE','pieniAarre':{'nimi':'Granaatti','fakta':'F','kuva':'assets/aarteet/p.jpg','url':'https://u/p.jpg','varat':[]},'isoAarre':null," +
                "'data':{'pieniAarre':{'name':'Vanha'}}}");
            var elaimet = Kokoelma("elaintayt",
                "{'id':'CZE','maa':'CZE','elain':'ilves','otsikko':'O','teksti':'T','lahde':'L','lat':50,'lon':15,'nimio':null,'kuva':{'arvo':'a.jpg','url':'https://u/e.jpg'},'data':{'elain':'vanha','kuva':'assets/e.jpg'}}");
            var julisteet = Kokoelma("julisteet",
                "{'id':'praha','kaupunki':'praha','otsikko':'Praha 1873','lyhyt':'L','selite':'S','kuva':{'arvo':'j.png','url':'https://u/julisteet/j.png'},'data':{'tiedosto':'vanha.png','otsikko':'vanha'}}");
            var fokus = Kokoelma("fokusvirrat",
                "{'id':'praha','kaupunki':'praha','virta':{'kohtaaminen':{'hahmo':'H'}},'lehtitehtavat':['praha:aarre','praha:juliste']," +
                "'kohtaamispiste':{'nimi':'Silta','laudat':{'maailmankartta':{'x':1,'y':2}}},'sahketehtava':{'id':'s','sahke':'STOP','aukot':[]}," +
                "'data':{'kohtaaminen':null,'lehtitehtavat':[{'id':'vanha','palkinto':'piste'}]}}");
            var lehtitehtavat = Kokoelma("lehtitehtavat",
                "{'id':'praha:aarre','kaupunki':'praha','tehtava':'aarre','palkinto':'piste'},{'id':'praha:juliste','kaupunki':'praha','tehtava':'juliste','palkinto':'juliste'}");
            var puheet = Kokoelma("saapumispuheet",
                "{'id':'praha','kaupunki':'praha','url':'https://u/a.mp3','teksti':'Praha.','kesto':3.5,'data':{'url':'https://u/vanha.mp3','text':'vanha'}}");

            string Lue()
            {
                var r = SisaltoTuonti.LueReitit(reitit);
                var m = Laattamaarat.Lue(laatat);
                var n = new Aarrenimet(); n.LueLaatat(laatat); n.LuePaikallisaarteet(paikalliset);
                var d = new Kysymysdata(); d.LueTarinakaari(kaari); d.LuePaikkatiedot(paikat);
                var ko = new Kohtaamiset(); ko.Kaupungit["praha"] = new Kohtaaminen();
                ko.LueTarinakaari(kaari); ko.LueKohtaamiset(kohtaamiset); ko.LueKohtaamiskuvat(kuvat);
                var ks = Kauppasisalto.Lue(elaimet, julisteet);
                var f = Fokusdata.Lue(fokus, lehtitehtavat: lehtitehtavat);
                var s = Sahketehtava.LueKokoelma(fokus);
                var l = new Luennat(); l.LueSaapumispuheet(puheet);
                var k = ko.Kaupunki("praha");
                var kk = d.Kaaret["praha"];
                return string.Join("|",
                    $"{r[0].Askeleet},{r[0].Laji},{r[1].Laji}",
                    string.Join(";", m.Maarat.Select(x => x.Key + "=" + x.Value)),
                    n.Hae(Laattatyypit.PieniAarre, null, null)?.Nimi, n.Hae(Laattatyypit.PieniAarre, "europe", null)?.Nimi,
                    n.Hae(Laattatyypit.PieniAarre, "europe", "CZE")?.Nimi + "," + n.Hae(Laattatyypit.PieniAarre, "europe", "CZE")?.KuvaUrl,
                    $"{kk.Nimi},{kk.Q},{string.Join(";", kk.Vaihtoehdot)},{kk.Oikea},{kk.Fakta}",
                    string.Join(";", d.Paikkatiedot["praha"].Select(p => $"{p.Teksti},{p.Aani},{p.Lahde}")),
                    $"{k.KaariKohtaaminen},{k.KaariAarre},{k.Tervehdys},{k.Loyto},{k.Tyhja},{k.Vaarin},{k.Hahmo},{k.Nappi},{k.Tunteet["aarre"].Tunne},{k.Tunteet["loyto"].Voimakkuus}",
                    $"{k.TavallinenKuva?.Url},{k.TavallinenKuva?.Alt},{k.KaariKuva?.Url}",
                    $"{ks.Elaintayt["CZE"].Elain},{ks.Elaintayt["CZE"].Kuva},{ks.Elaintayt["CZE"].Lat}",
                    $"{ks.Julisteet["praha"].Otsikko},{ks.Julisteet["praha"].Tiedosto}",
                    string.Join(";", f.Avaajat("praha")) + "," + s["praha"].Sahke,
                    $"{l.Saapumispuhe("praha").Url},{l.Saapumispuhe("praha").Teksti},{l.Saapumispuhe("praha").Kesto}");
            }
            const string odotus = "4,Meri,Lento|star=2;pieniAarre=3|Uusi|Meripihka|Granaatti,https://u/p.jpg|Tomáš,Q?,a;b,1,F|uusi,,;t,isoisa,L"
                + "|K,A,T,L,Y,V,H,N,ilo,0.7|https://u/1.jpg,Alt,|ilves,https://u/e.jpg,50|Praha 1873,https://u/julisteet/j.png"
                + "|fokus:aarre,STOP|https://u/a.mp3,Praha.,3.5";
            var kulttuuri = System.Globalization.CultureInfo.CurrentCulture;
            System.Globalization.CultureInfo.CurrentCulture = System.Globalization.CultureInfo.InvariantCulture;
            try
            {
                Oleta.Sama(odotus, Lue(), "päätaso voittaa raa'an datan");
                Oleta.Sama(odotus, Kiellolla(Lue), "päätaso riittää raakakiellolla");
            }
            finally { System.Globalization.CultureInfo.CurrentCulture = kulttuuri; }
        }

        [Testi] static void PelkkaRaakaEiKelpaaKiellolla()
        {
            var reitit = Kokoelma("reitit", "{'id':'r0','laji':'maa','a':'x','b':'y','data':{'a':'x','b':'y','steps':3}}");
            Oleta.Sama(3, SisaltoTuonti.LueReitit(reitit)[0].Askeleet, "vanha paketti ilman kieltoa");
            bool kaatui = false;
            try { Kiellolla(() => SisaltoTuonti.LueReitit(reitit)); } catch (FormatException) { kaatui = true; }
            Oleta.Tosi(kaatui, "kielto: data.steps ei kelpaa");

            var laatat = Kokoelma("laatat", "{'id':'tokens','data':{'counts':{'star':7}}}");
            Oleta.Sama(7, Laattamaarat.Lue(laatat).Yhteensa, "data.counts ilman kieltoa");
            kaatui = false;
            try { Kiellolla(() => Laattamaarat.Lue(laatat)); } catch (FormatException) { kaatui = true; }
            Oleta.Tosi(kaatui, "kielto: data.counts ei kelpaa");

            var paikat = Kokoelma("paikkatiedot", "{'id':'p:0','kaupunki':'praha','data':'vanha'}");
            var d = new Kysymysdata(); d.LuePaikkatiedot(paikat);
            Oleta.Sama("vanha", d.Paikkatiedot["praha"][0].Teksti, "merkkijonodata ilman kieltoa");
            d = Kiellolla(() => { var x = new Kysymysdata(); x.LuePaikkatiedot(paikat); return x; });
            Oleta.Sama(null, d.Paikkatiedot["praha"][0].Teksti, "kielto: merkkijonodata ei kelpaa");

            // Fokusvirran päätason lehtitehtävälista vaatii kokoelman lehtitehtavat (palkinto).
            var fokus = Kokoelma("fokusvirrat", "{'id':'praha','lehtitehtavat':['praha:aarre']}");
            kaatui = false;
            try { Fokusdata.Lue(fokus); } catch (FormatException) { kaatui = true; }
            Oleta.Tosi(kaatui, "päätason lista ilman kokoelmaa");
        }
}
}
