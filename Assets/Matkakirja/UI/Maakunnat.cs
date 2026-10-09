// KARTTASELITTEEN MAAKUNNAT-VÄLILEHTI (Natiivi-UI): webin js/karttatyokalu-maakunnat.js
// natiivina (omistajan päätös 22.9.2026): Aarnin luettelon maiden nykyiset
// hallinnolliset alueet maittain ja Livian luonnehdinta kustakin.
//
//   Lista      maaotsikko (▸, yksi maa auki kerrallaan) + rivi per alue; rivin
//              napautus tai sormen veto rivien yli valitsee kuten Nostot-välilehden
//              peukalolevy (löydös 156; valinta muistetaan: PlayerPrefs
//              matkakirja-karttatyokalu-maakunta, avain "ISO:tunnus").
//              Auki on pelaajan nykyisen maan ryhmä (löydös 70, Fablen linjaus
//              25.9.2026); maassa ilman maakuntia pelkkä teksti "Tälle maalle
//              ei ole vielä maakuntia" (löydös 105: muiden maiden ryhmät piilossa). Saapuminen toiseen
//              maahan päivittää listan ilman uudelleenavausta (Matka.Saapui).
//   Luonnehdinta  listan alla kiinteänä: nimi, lyhyt teksti ja ⊕ → kortti.
//   Kortti     kuva nostokortin mitoilla (kuva + kuva2 selattavina, lähderivi), pitkä teksti ja minikartta sen
//              oikealla, Pulun kysymykset (napautus → Pulun chat valmiilla vastauksella). 6.10.: kortti on nostokortti.
//
// Data sisältöpaketista (LinssiSisalto-reitti, sama välimuisti):
//   moduulit/js/karttatyokalu-maakunnat.json  MAAKUNTIEN_NIMET, MAAKUNTIEN_MAAT
//   moduulit/js/packs/maakunnat-luonnehdinnat.json  { lyhyt, pitka, kuva, kuva2 }
//   moduulit/js/packs/maakunnat-pulu.json  [{ q, a }]
// Karttakytkentä: Maakunnat.Valittu (avain) — webin ui.karttatyokaluMaakunta;
// värjäys kartalla on Natiivisepän kerros, kun vektoritaso tulee.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Maakunnat
    {
        const string TallennusAvain = "matkakirja-karttatyokalu-maakunta";

        /// <summary>Valinta vaihtui (avain "ISO:tunnus"); kartan värjäys kuuntelee tätä.</summary>
        public static event Action<string> Valittu;
        /// <summary>Nykyinen valinta tai null.</summary>
        public static string ValittuAvain { get; private set; }

        /// <summary>
        /// Löydös 114 (omistaja, build 14): listan valinta "Pois" piilottaa kartalta myös kohdemaan maakunnat (113:n
        /// oletusrajat, Natiiviseppä kuuntelee PoisMuuttui). Muistetaan (PlayerPrefs); maakunnan valinta kumoaa.
        /// </summary>
        public static bool Pois { get; private set; }

        /// <summary>Löydös 156: sormi vetää rivien yli (valinta vaihtuu rivi kerrallaan); kartta voi kuunnella irrotusta.</summary>
        public static bool Vedossa { get; private set; }
        public static event Action<bool> VetoMuuttui;
        public static event Action<bool> PoisMuuttui;

        /// <summary>
        /// Löydös 165 (omistaja 1.0.21: valittu Gelderland jäi kartalle vihreäksi pelaajan ollessa Amsterdamissa): välilehti
        /// on näkyvissä (karttaselite auki MAAKUNNAT-välilehdellä). Kartan korostus (MaakunnatSilta) vain silloin; webissä
        /// valinta näkyy vain listassa ja luonnehdinnassa. Valinta itse muistetaan edelleen (PlayerPrefs).
        /// </summary>
        public static bool Nakyvissa { get; private set; }
        public static event Action<bool> NakyvissaMuuttui;

        public static void AsetaNakyvissa(bool nakyy)
        {
            if (Nakyvissa == nakyy) return;
            Nakyvissa = nakyy;
            NakyvissaMuuttui?.Invoke(nakyy);
        }
        const string PoisAvain = "matkakirja-karttatyokalu-maakunnat-pois", PoisTunnus = ":pois";
        static bool OnPois(string avain) => avain != null && avain.EndsWith(PoisTunnus, StringComparison.Ordinal);

        /// <summary>
        /// Löydös 169 (omistaja 19.3x): "Kaikki" = koko maa ilman rajausta (ei yksittäistä maakuntaa, ei Pois). Rivi on valittuna
        /// aina, kun kumpaakaan ei ole; välilehden ollessa auki kartalla kaikkien maakuntien täyttö ilman korostusta
        /// (MaakunnatSilta saa avaimen "ISO:kaikki"). Ei tallennu (tallennettu valinta poistetaan).
        /// </summary>
        public const string KaikkiTunnus = ":kaikki";
        const string ValinnatLuokka = "mk-maakunnat__valinnat";

        /// <summary>Rivin maaryhmän rivisäiliö (Kaikki/Pois ovat yhden tason syvemmällä valintarivissä).</summary>
        static VisualElement Ryhmassa(VisualElement rivi) =>
            rivi.parent != null && rivi.parent.ClassListContains(ValinnatLuokka) ? rivi.parent.parent : rivi.parent;
        public static bool OnKaikki(string avain) => avain != null && avain.EndsWith(KaikkiTunnus, StringComparison.Ordinal);

        /// <summary>
        /// MAAKUNTAKARTTA (omistaja 28.9.2026 klo 17.1x): lista pois kokonaan, maakunta valitaan napauttamalla karttaa
        /// (Karttaselite.MaakuntaKartta). Tosi, kun tila on auki: kartta näyttää rajat ilman täyttöä, kunnes jotain napautetaan
        /// (MaakunnatSilta), ja luonnehdinta on isompi kuvausruutu.
        /// </summary>
        public static bool Karttatila { get; private set; }
        bool listaPiilossa;

        /// <summary>Lista piiloon pysyvästi (maakuntakartta): vain kuvausruutu jää.</summary>
        public void PiilotaLista()
        {
            listaPiilossa = true;
            vieritys.style.display = DisplayStyle.None;
            juuri.AddToClassList("mk-maakunnat--kartta");
            PaivitaLuonnehdinta();
        }

        /// <summary>Maakuntakartta auki/kiinni: auetessa valinta tyhjenee (ei tallennettua valintaa kartalle), Pois pois.</summary>
        public void AsetaKarttatila(bool auki)
        {
            if (Karttatila == auki) return;
            Karttatila = auki;
            if (!auki) return;
            if (ValittuAvain != null && rivit.TryGetValue(ValittuAvain, out var vanha)) vanha.RemoveFromClassList("mk-valittu");
            bool oliPois = Pois;
            ValittuAvain = null;
            Pois = false;
            try { PlayerPrefs.DeleteKey(TallennusAvain); PlayerPrefs.SetInt(PoisAvain, 0); PlayerPrefs.Save(); } catch (Exception) { }
            PaivitaLuonnehdinta();
            Valittu?.Invoke(null);
            if (oliPois) PoisMuuttui?.Invoke(false);
        }

        sealed class Maa { public string Iso, Nimi; public List<(string Tunnus, string Nimi)> Alueet = new List<(string, string)>(); }
        sealed class Luonnehdinta { public string Lyhyt, Pitka, Pikkukuva; public List<Dictionary<string, object>> Kuvat = new List<Dictionary<string, object>>(); }

        readonly UiKerros kerros;
        readonly VisualElement juuri, lista, kuvaus, peukalo;
        readonly ScrollView vieritys;
        readonly Label tila, eiMaakuntia;
        /// <summary>Maakunnat avautuvat nostokorttiin (omistaja 6.10. 13.0x; ennen oma MaakuntaKortti).</summary>
        static Nostokortti Kortti => UiNakymat.Olemassa ? UiNakymat.Hae().Nostokortti : null;
        /// <summary>Tämän istunnon aikana avatut maakunnat (selaimen ✓).</summary>
        readonly HashSet<string> luetut = new HashSet<string>();
        readonly Dictionary<string, Button> rivit = new Dictionary<string, Button>();
        readonly Dictionary<string, (Button Otsikko, VisualElement Rivit)> ryhmat = new Dictionary<string, (Button, VisualElement)>();
        List<Maa> maat;
        Dictionary<string, object> luonnehdinnat, pulu;
        bool haussa, rakennettu;
        VisualElement vedettava;
        string sovellettuIso = "";
        Matka kuunneltu;

        public bool KorttiAuki => Kortti?.MaakuntaAuki ?? false;

        public Maakunnat(UiKerros kerros, VisualElement isa)
        {
            this.kerros = kerros;
            juuri = Rakenne.El("mk-maakunnat", isa, PickingMode.Ignore);
            // Omistaja 29.9.2026 (iPhone-laitekuva): ~1,4×-isonnus vain tabletilla (mk-maakunnat--tabletti,
            // Kartta.uss); iPhonella "mininosto" pysyy aiemman kokoisena, vain pohjaväri ja kehyksettömyys jäävät.
            juuri.EnableInClassList("mk-maakunnat--tabletti", UiKerros.Tabletti);
            vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-selite__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            juuri.Add(vieritys);
            lista = Rakenne.El("mk-maakunnat__lista", vieritys);
            peukalo = Rakenne.El("mk-peukalo mk-peukalo--tyhja", lista, PickingMode.Ignore);
            peukalo.style.display = DisplayStyle.None;
            lista.RegisterCallback<GeometryChangedEvent>(_ => SiirraPeukalo());
            tila = Rakenne.Teksti(Kieli.T("ui.maakunnat.ladataan"), "mk-maakunnat__tila", lista);
            eiMaakuntia = Rakenne.Teksti(Kieli.T("ui.maakunnat.ei-maakuntia"), "mk-maakunnat__tila", lista);
            eiMaakuntia.style.display = DisplayStyle.None;

            kuvaus = Rakenne.El("mk-maakunnat__luonnehdinta", juuri);
            kuvaus.style.display = DisplayStyle.None;
            Nostokortti.MaakuntaNosto = MaakunnanNosto;
            Nostokortti.MaakuntaLista = MaanMaakunnat;
            ValittuAvain = LueTallennettu();
            try { Pois = PlayerPrefs.GetInt(PoisAvain, 0) == 1; } catch (Exception) { }
        }

        /// <summary>Välilehti avattiin: data haetaan ja lista rakennetaan ensimmäisellä kerralla.</summary>
        public void Avautui()
        {
            if (rakennettu || haussa) { if (rakennettu) { SovitaMaa(); SiirraPeukalo(); } return; }
            haussa = true;
            tila.text = Kieli.T("ui.maakunnat.ladataan");
            UiKerros.Hae().StartCoroutine(Lataa());
        }

        /// <summary>Data valmiiksi taustalla (automaattinen maakunta, Karttaselite): ei tee mitään, jos jo haettu tai haussa.</summary>
        public void Esilataa()
        {
            if (!rakennettu && !haussa) Avautui();
        }

        string odottava;

        /// <summary>
        /// Valinta heti tai heti datan latauduttua (automaattinen maakunta: ensimmäinen napautus voi ehtiä ennen latausta).
        /// Odottava valinta tehdään vain, jos maakuntakartta on yhä auki (Karttatila).
        /// </summary>
        public void ValitseKunValmis(string avain)
        {
            if (rakennettu) { odottava = null; Valitse(avain); AvaaKartalta(avain); return; }
            odottava = avain;
            Avautui();
        }

        public void SuljeKortti() { if (KorttiAuki) Kortti.Sulje(); }

        /// <summary>
        /// Kartan napautus avaa maakunnan suoraan pienenä nostokorttina (Päätoimittaja 6.10. 13.1x: "mieluiten maakunnan napautus
        /// avaa suoraan pienen nostokortin"); lappu jää kortin alle ja palaa kortin sulkeuduttua.
        /// </summary>
        public void AvaaKartalta(string avain)
        {
            if (avain == null || OnPois(avain) || OnKaikki(avain) || HaeLuonnehdinta(avain) == null) return;
            AvaaKortti(avain);
        }

        /// <summary>Maakunta nostokorttiin (lapun "Lue lisää" ja pikkukuva).</summary>
        void AvaaKortti(string avain) => Kortti?.Avaa(Nostokortti.MaakuntaEtuliite + avain);

        /// <summary>
        /// Nostokortin sisältö valolle "maakunta:ISO:tunnus": otsikko, luonnehdinta, kuvat, minikartta ja Pulun valmiit kysymykset.
        /// Selaimen ja AUTO:n siirtymä valitsee maakunnan myös kartalla (korostus ja lappu seuraavat).
        /// </summary>
        Nosto MaakunnanNosto(string valo)
        {
            string avain = valo.Substring(Nostokortti.MaakuntaEtuliite.Length);
            if (!rakennettu || !Kelpaa(avain)) return null;
            var data = HaeLuonnehdinta(avain);
            if (data == null) return null;
            if (avain != ValittuAvain) Valitse(avain);
            luetut.Add(valo);
            string nimi = Nimi(avain), maaNimi = MaanNimi(avain), pitka = data.Pitka ?? data.Lyhyt;
            var n = new Nosto
            {
                Laji = NostoLaji.Maakunta, Id = valo, Iso = Jaa(avain).Iso, Luokka = Kieli.T("ui.maakunnat.luokka"), Otsikko = nimi, Teksti = pitka,
                Kylkikartta = MaakuntaMinikartta.Hae(avain),
                ValmiitKysymykset = HaePulu(avain),
                PuluAihe = new PuluChat.Aihe
                {
                    Otsake = "Maakuntakortti, josta pelaaja kysyy",   // kieli: ei (kielimallille lähtevä data (PuluChat.Aihe.Otsake))
                    Nimi = string.IsNullOrEmpty(maaNimi) ? nimi : $"{nimi} ({maaNimi})",
                    Tyyppi = "maakunta",
                    Teksti = pitka,
                },
            };
            foreach (var k in data.Kuvat)
            {
                string osoite = MiniJson.Teksti(k, "osoite");
                if (!string.IsNullOrEmpty(osoite)) n.Kuvat.Add(new NostoKuva { Lahde = osoite, LahdeRivi = KuvanLahde(k, osoite) });
            }
            return n;
        }

        /// <summary>Selaimen lista: maan kaikki maakunnat, joilla on luonnehdinta (‹ › ja AUTO pysyvät niiden sisällä).</summary>
        Nostoselain.Lista MaanMaakunnat(string valo)
        {
            var iso = Jaa(valo.Substring(Nostokortti.MaakuntaEtuliite.Length)).Iso;
            var m = maat?.FirstOrDefault(x => x.Iso == iso);
            if (m == null) return null;
            var l = new Nostoselain.Lista { Otsikko = Kieli.T("ui.maakunnat.lista-otsikko", m.Nimi), Siru = Kieli.T("ui.maakunnat.siru"), Avaaja = Kieli.T("ui.maakunnat.avaaja"), Luettu = luetut.Contains };
            foreach (var (tunnus, nimi) in m.Alueet)
                if (HaeLuonnehdinta(iso + ":" + tunnus) != null) l.Rivit.Add((Nostokortti.MaakuntaEtuliite + iso + ":" + tunnus, nimi));
            return l;
        }

        /// <summary>Lähderivi täydennettynä Commonsin tekijällä ja lisenssillä, jos puuttuu (web taytaLahderivi, #3438).</summary>
        static string KuvanLahde(Dictionary<string, object> k, string osoite)
        {
            string lahde = string.Join(" · ", new[] { MiniJson.Teksti(k, "lahde"), MiniJson.Teksti(k, "lisenssi") }.Where(x => !string.IsNullOrEmpty(x)));
            return Kuvatekija.Taydenna(lahde, MiniJson.Teksti(k, "tiedosto") ?? osoite) ?? "";
        }

        /// <summary>
        /// Löydös 170: sisältöpaketti vaihtui kesken istunnon → luonnehdinnat ja Pulun kysymykset uudelleen (pikkukuvat uusista
        /// osoitteista) ja näkyvä luonnehdinta päivitetään. Maalista (nimet) pysyy; se muuttuu vain skeeman mukana.
        /// </summary>
        public void SisaltoVaihtui()
        {
            if (!rakennettu || !UiKerros.Olemassa) return;
            UiKerros.Hae().StartCoroutine(LataaLuonnehdinnat());
        }

        System.Collections.IEnumerator LataaLuonnehdinnat()
        {
            string luonn = null, kysymykset = null;
            yield return LinssiSisalto.Hae("moduulit/js/packs/maakunnat-luonnehdinnat.json", t => luonn = t);
            yield return LinssiSisalto.Hae("moduulit/js/packs/maakunnat-pulu.json", t => kysymykset = t);
            try
            {
                if (luonn != null) luonnehdinnat = Viennit(luonn, "MAAKUNTIEN_LUONNEHDINNAT");
                if (kysymykset != null) pulu = Viennit(kysymykset, "MAAKUNTIEN_PULU");
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ui maakunnat: uusi sisältö: " + e.Message); }
            PaivitaLuonnehdinta();
        }

        System.Collections.IEnumerator Lataa()
        {
            string nimet = null, luonn = null, kysymykset = null;
            yield return LinssiSisalto.Hae("moduulit/js/karttatyokalu-maakunnat.json", t => nimet = t);
            yield return LinssiSisalto.Hae("moduulit/js/packs/maakunnat-luonnehdinnat.json", t => luonn = t);
            yield return LinssiSisalto.Hae("moduulit/js/packs/maakunnat-pulu.json", t => kysymykset = t);
            haussa = false;
            try
            {
                maat = LueMaat(nimet);
                luonnehdinnat = Viennit(luonn, "MAAKUNTIEN_LUONNEHDINNAT");
                pulu = Viennit(kysymykset, "MAAKUNTIEN_PULU");
            }
            catch (Exception e)
            {
                Debug.LogWarning("MATKAKIRJA ui maakunnat: " + e.Message);
                maat = null;
            }
            if (maat == null || maat.Count == 0)
            {
                tila.text = Kieli.T("ui.maakunnat.ei-ladattu");
                yield break;
            }
            Rakenna();
        }

        static Dictionary<string, object> Ob(object x) => x as Dictionary<string, object>;

        static Dictionary<string, object> Viennit(string json, string nimi)
        {
            if (json == null) return null;
            var v = Ob(MiniJson.Kentta(Ob(MiniJson.Jasenna(json)), "exportit"));
            var x = MiniJson.Kentta(v, nimi);
            // Vientiformaatti voi kääriä arvon ({ arvo: … }).
            if (Ob(x) is Dictionary<string, object> o && o.Count == 1 && o.ContainsKey("arvo")) x = o["arvo"];
            return Ob(x);
        }

        static List<Maa> LueMaat(string json)
        {
            if (json == null) return null;
            var v = Ob(MiniJson.Kentta(Ob(MiniJson.Jasenna(json)), "exportit"));
            var nimet = Ob(MiniJson.Kentta(v, "MAAKUNTIEN_NIMET"));
            var lista = MiniJson.Kentta(v, "MAAKUNTIEN_MAAT") as List<object>;
            if (nimet == null || lista == null) return null;
            var tulos = new List<Maa>();
            foreach (var o in lista.Select(Ob).Where(o => o != null))
            {
                var m = new Maa { Iso = MiniJson.Teksti(o, "iso"), Nimi = MiniJson.Teksti(o, "nimi") };
                if (m.Iso == null) continue;
                // Aineiston järjestys (MiniJson säilyttää avainten järjestyksen kuten webin Object.keys).
                if (Ob(MiniJson.Kentta(nimet, m.Iso)) is Dictionary<string, object> alueet)
                    foreach (var p in alueet) m.Alueet.Add((p.Key, p.Value as string ?? p.Key));
                tulos.Add(m);
            }
            return tulos;
        }

        string MaanNimi(string avain) => maat?.FirstOrDefault(x => x.Iso == Jaa(avain).Iso)?.Nimi;

        string Nimi(string avain)
        {
            var (iso, tunnus) = Jaa(avain);
            var m = maat?.FirstOrDefault(x => x.Iso == iso);
            var a = m?.Alueet.FirstOrDefault(x => x.Tunnus == tunnus);
            return a?.Nimi ?? tunnus;
        }

        static (string Iso, string Tunnus) Jaa(string avain)
        {
            int i = avain?.IndexOf(':') ?? -1;
            return i < 0 ? (null, null) : (avain.Substring(0, i), avain.Substring(i + 1));
        }

        bool Kelpaa(string avain) => avain != null && rivit.ContainsKey(avain);

        /// <summary>Avain kelpaa valinnaksi, tai dataa ei ole vielä ladattu (automaattinen maakunta päättää latauksen jälkeen).</summary>
        public bool Tunnettu(string avain) => avain != null && (!rakennettu || Kelpaa(avain));

        Luonnehdinta HaeLuonnehdinta(string avain)
        {
            var (iso, tunnus) = Jaa(avain);
            var o = Ob(MiniJson.Kentta(Ob(MiniJson.Kentta(luonnehdinnat, iso ?? "")), tunnus ?? ""));
            if (o == null) return null;
            // Löydös 158 (Fablen datasopimus 26.9.): oma pikkukuva kentässä pikkukuva (ämpäriosoite).
            var l = new Luonnehdinta { Lyhyt = MiniJson.Teksti(o, "lyhyt"), Pitka = MiniJson.Teksti(o, "pitka"), Pikkukuva = MiniJson.Teksti(o, "pikkukuva") };
            // Kuva voi olla yksi olio tai lista (web maakunnanKuvat).
            var k = MiniJson.Kentta(o, "kuva");
            if (Ob(k) is Dictionary<string, object> yksi) l.Kuvat.Add(yksi);
            else if (k is List<object> monta) l.Kuvat.AddRange(monta.Select(Ob).Where(x => x != null));
            // Toinen kuva selattavaksi (omistajan kortti 30.9.2026 klo 22.5x): valinnainen kuva2, sama muoto kuin kuva.
            if (Ob(MiniJson.Kentta(o, "kuva2")) is Dictionary<string, object> toinen) l.Kuvat.Add(toinen);
            return l;
        }

        List<(string Q, string A)> HaePulu(string avain)
        {
            var (iso, tunnus) = Jaa(avain);
            var l = MiniJson.Kentta(Ob(MiniJson.Kentta(pulu, iso ?? "")), tunnus ?? "") as List<object>;
            return l?.Select(Ob).Where(x => x != null)
                .Select(x => (MiniJson.Teksti(x, "q"), MiniJson.Teksti(x, "a")))
                .Where(x => !string.IsNullOrEmpty(x.Item1)).ToList() ?? new List<(string, string)>();
        }

        // --- lista ---------------------------------------------------------------------

        void Rakenna()
        {
            rakennettu = true;
            tila.RemoveFromHierarchy();
            if (ValittuAvain != null && !maat.Any(m => m.Alueet.Any(a => m.Iso + ":" + a.Tunnus == ValittuAvain))) ValittuAvain = null;
            foreach (var m in maat)
            {
                var ryhma = Rakenne.El("mk-maakunnat__ryhma", lista, PickingMode.Ignore);
                string iso = m.Iso;
                var otsikko = Rakenne.Nappi(null, "mk-maakunnat__maa", () => VaihdaRyhma(iso), ryhma);
                var nuoli = new SvgIkoni(Ikonit.NuoliOikea);
                nuoli.AddToClassList("mk-maakunnat__nuoli");
                otsikko.Add(nuoli);
                var ot = Rakenne.Teksti((m.Nimi ?? iso).ToUpperInvariant(), "mk-maakunnat__maanimi", otsikko);
                Kirjasimet.Aseta(ot, Kirjasin.Kone);
                // Löydös 156: rivien säiliö on osuman kohde, rivit eivät (kuten Karttaselitteen lista, löydös 69).
                var ryhmanRivit = Rakenne.El("mk-maakunnat__rivit", ryhma);
                KytkeVeto(ryhmanRivit);
                if (m.Alueet.Count > 0)
                {
                    // Löydös 173: Kaikki ja Pois samalla ylimmällä rivillä (Kaikki vasemmalla); veto valitsee puoliskon x:n mukaan.
                    var valinnat = Rakenne.El(ValinnatLuokka, ryhmanRivit, PickingMode.Ignore);
                    valinnat.userData = ValinnatLuokka;
                    string kaikkiAvain = iso + KaikkiTunnus;
                    var kaikkiRivi = Rakenne.Nappi(null, "mk-maakunnat__rivi mk-maakunnat__rivi--pois mk-maakunnat__rivi--kaikki", () => Valitse(kaikkiAvain), valinnat);
                    Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.maakunnat.kaikki"), "mk-maakunnat__nimi", kaikkiRivi), Kirjasin.Luku);
                    kaikkiRivi.tooltip = Kieli.T("ui.maakunnat.koko-maa");
                    kaikkiRivi.pickingMode = PickingMode.Ignore;
                    kaikkiRivi.userData = kaikkiAvain;
                    rivit[kaikkiAvain] = kaikkiRivi;
                    string poisAvain = iso + PoisTunnus;
                    var poisRivi = Rakenne.Nappi(null, "mk-maakunnat__rivi mk-maakunnat__rivi--pois", () => Valitse(poisAvain), valinnat);
                    Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.maakunnat.pois"), "mk-maakunnat__nimi", poisRivi), Kirjasin.Luku);
                    poisRivi.tooltip = Kieli.T("ui.maakunnat.pois-kartalta");
                    poisRivi.pickingMode = PickingMode.Ignore;
                    poisRivi.userData = poisAvain;
                    rivit[poisAvain] = poisRivi;
                }
                foreach (var a in m.Alueet)
                {
                    string avain = iso + ":" + a.Tunnus;
                    var rivi = Rakenne.Nappi(null, "mk-maakunnat__rivi", () => Valitse(avain), ryhmanRivit);
                    var n = Rakenne.Teksti(a.Nimi, "mk-maakunnat__nimi", rivi);
                    Kirjasimet.Aseta(n, Kirjasin.Luku);
                    rivi.tooltip = a.Nimi;
                    rivi.pickingMode = PickingMode.Ignore;
                    rivi.userData = avain;
                    rivit[avain] = rivi;
                }
                ryhmat[iso] = (otsikko, ryhmanRivit);
                AsetaRyhma(iso, false);
            }
            if (ValittuAvain != null) rivit[ValittuAvain].AddToClassList("mk-valittu");
            MerkitsePois();
            SovitaMaa();
            // Peukalo viimeiseksi, jotta se piirtyy rivien päälle.
            peukalo.BringToFront();
            PaivitaLuonnehdinta();
            if (ValittuAvain != null && !OnPois(ValittuAvain)) Valittu?.Invoke(ValittuAvain);
            // Automaattinen maakunta: latauksen aikana napautettu maakunta valitaan nyt, jos lappu on yhä auki.
            var odotettu = odottava;
            odottava = null;
            if (odotettu != null && Karttatila) { Valitse(odotettu); AvaaKartalta(odotettu); }
        }

        /// <summary>
        /// Löydös 156 (omistaja, build 19): sormen veto rivien yli valitsee samalla eleellä kuin Nostot-välilehti
        /// (Karttaselite.ValitseKohdasta): painallus valitsee heti, veto vaihtaa valinnan rivi kerrallaan, peukalo seuraa
        /// ilman siirtymää (mk-vetaa), eikä ScrollView vieritä vedon aikana.
        /// </summary>
        void KytkeVeto(VisualElement rivit)
        {
            rivit.RegisterCallback<PointerDownEvent>(e =>
            {
                vedettava = rivit;
                rivit.CapturePointer(e.pointerId);
                AsetaVeto(true);
                ValitseKohdasta(rivit, e.localPosition);
                e.StopPropagation();
            });
            rivit.RegisterCallback<PointerMoveEvent>(e =>
            {
                if (vedettava != rivit) return;
                ValitseKohdasta(rivit, e.localPosition);
                e.StopPropagation();
            });
            rivit.RegisterCallback<PointerUpEvent>(e => { if (rivit.HasPointerCapture(e.pointerId)) rivit.ReleasePointer(e.pointerId); LopetaVeto(); });
            rivit.RegisterCallback<PointerCaptureOutEvent>(_ => LopetaVeto());
        }

        void LopetaVeto()
        {
            if (vedettava == null) return;
            vedettava = null;
            AsetaVeto(false);
        }

        void AsetaVeto(bool veto)
        {
            peukalo.EnableInClassList("mk-vetaa", veto);
            if (Vedossa == veto) return;
            Vedossa = veto;
            VetoMuuttui?.Invoke(veto);
        }

        /// <summary>Rivi sormen korkeudella (säiliön koordinaatit); vedettäessä rivien ohi reunimmainen rivi.</summary>
        void ValitseKohdasta(VisualElement rivit, Vector2 p)
        {
            float y = p.y;
            VisualElement osuma = null;
            foreach (var r in rivit.Children())
            {
                if (!(r.userData is string) || r.resolvedStyle.display == DisplayStyle.None) continue;
                var l = r.layout;
                if (float.IsNaN(l.height)) continue;
                if (osuma == null && y < l.yMin) { osuma = r; break; }
                osuma = r;
                if (y < l.yMax) break;
            }
            // Löydös 173: Kaikki/Pois-rivillä puolisko x:n mukaan.
            if (osuma != null && osuma.ClassListContains(ValinnatLuokka))
            {
                VisualElement puoli = null;
                float x = p.x - osuma.layout.x;
                foreach (var c in osuma.Children()) { puoli = c; if (x < c.layout.xMax) break; }
                osuma = puoli;
            }
            if (osuma?.userData is string avain) Valitse(avain);
        }

        /// <summary>Pois-tilassa jokaisen maan Pois-rivi näkyy valittuna (tila on maasta riippumaton).</summary>
        void MerkitsePois()
        {
            foreach (var p in rivit)
            {
                if (OnPois(p.Key)) p.Value.EnableInClassList("mk-valittu", Pois);
                // Löydös 169: Kaikki valittuna, kun ei ole Pois eikä yksittäistä maakuntaa.
                else if (OnKaikki(p.Key)) p.Value.EnableInClassList("mk-valittu", !Pois && ValittuAvain == null);
            }
        }

        void AsetaRyhma(string iso, bool auki)
        {
            var r = ryhmat[iso];
            r.Rivit.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            r.Otsikko.EnableInClassList("mk-auki", auki);
        }

        /// <summary>Vain yksi maa auki kerrallaan (web vaihdaRyhma).</summary>
        void VaihdaRyhma(string iso)
        {
            bool oliAuki = ryhmat[iso].Otsikko.ClassListContains("mk-auki");
            foreach (var muu in ryhmat.Keys.ToList()) AsetaRyhma(muu, !oliAuki && muu == iso);
            if (!oliAuki) Rakenne.Vierita(vieritys, ryhmat[iso].Otsikko);
        }

        /// <summary>Pelaajan nykyisen kaupungin maa tai null (matkalla / ei peliä).</summary>
        static string NykyinenIso()
        {
            var o = PeliOhjain.Instanssi;
            if (o == null || o.Matka == null) return null;
            var s = o.Matka.Tila.Pelaaja.Sijainti;
            return s.Kaupungissa ? UiSisalto.Kaupunki(s.Kaupunki)?.Maa : null;
        }

        /// <summary>
        /// Nykyisen maan ryhmä auki, muut kiinni; maalle ilman maakuntia ilmoitus (löydös 70).
        /// Sovelletaan vain, kun maa vaihtuu, jotta pelaajan omat avaukset säilyvät.
        /// Matkalla (ei kaupungissa) lista pysyy ennallaan.
        /// </summary>
        void SovitaMaa()
        {
            KuunteleSaapumisia();
            if (!rakennettu) return;
            string iso = NykyinenIso();
            if (iso == null || iso == sovellettuIso) return;
            sovellettuIso = iso;
            bool onMaakuntia = ryhmat.ContainsKey(iso);
            eiMaakuntia.style.display = onMaakuntia ? DisplayStyle.None : DisplayStyle.Flex;
            // Löydös 105 (omistaja build 13): lista näyttää vain nykyisen maan maakunnat, ei koskaan muiden maiden; maalla
            // ilman maakuntia pelkkä ilmoitus. Toisen maan valinta ja luonnehdinta pois.
            foreach (var muu in ryhmat.Keys.ToList())
            {
                AsetaRyhma(muu, muu == iso);
                ryhmat[muu].Otsikko.parent.style.display = muu == iso ? DisplayStyle.Flex : DisplayStyle.None;
            }
            if (ValittuAvain != null && Jaa(ValittuAvain).Iso != iso)
            {
                if (rivit.TryGetValue(ValittuAvain, out var vanha)) vanha.RemoveFromClassList("mk-valittu");
                ValittuAvain = null;
                PaivitaLuonnehdinta();
                MerkitsePois();
            }
            SiirraPeukalo();
        }

        /// <summary>Saapuminen päivittää listan (myös välilehti auki); Matka voi vaihtua (uusi peli / lataus).</summary>
        void KuunteleSaapumisia()
        {
            var m = PeliOhjain.Instanssi?.Matka;
            if (m == kuunneltu) return;
            if (kuunneltu != null) kuunneltu.Saapui -= Saapui;
            kuunneltu = m;
            if (m != null) m.Saapui += Saapui;
        }

        void Saapui(Pelaaja p, string kaupunki, bool uusi) => SovitaMaa();

        public void Valitse(string avain)
        {
            if (!Kelpaa(avain)) return;
            bool pois = OnPois(avain), kaikki = OnKaikki(avain);
            if (kaikki ? ValittuAvain == null && !Pois : avain == ValittuAvain && pois == Pois) return;
            if (ValittuAvain != null && rivit.TryGetValue(ValittuAvain, out var vanha)) vanha.RemoveFromClassList("mk-valittu");
            ValittuAvain = pois || kaikki ? null : avain;
            if (!pois && !kaikki) rivit[avain].AddToClassList("mk-valittu");
            try
            {
                if (pois || kaikki) PlayerPrefs.DeleteKey(TallennusAvain); else PlayerPrefs.SetString(TallennusAvain, avain);
                PlayerPrefs.SetInt(PoisAvain, pois ? 1 : 0);
                PlayerPrefs.Save();
            }
            catch (Exception) { }
            bool muuttui = pois != Pois;
            Pois = pois;
            MerkitsePois();
            PaivitaLuonnehdinta();
            SiirraPeukalo();
            // Pois: korostus ja rajat pois (MaakunnatSilta null), ja 113:n oletusrajat kuuntelevat PoisMuuttui.
            // Kaikki: avain "ISO:kaikki" (täyttö ilman korostusta).
            Valittu?.Invoke(pois ? null : avain);
            if (muuttui) PoisMuuttui?.Invoke(pois);
        }

        /// <summary>
        /// Löydös 177 (Uusi peli, PeliOhjain.MuistitTyhjennetty): valinta ja Pois pois muistista kuten webin
        /// uudelleenlatauksessa (PlayerPrefs on jo tyhjennetty); kartta kuulee Valittu(null) ja PoisMuuttui.
        /// </summary>
        public void Nollaa()
        {
            if (ValittuAvain != null && rivit.TryGetValue(ValittuAvain, out var vanha)) vanha.RemoveFromClassList("mk-valittu");
            bool muuttui = Pois;
            bool oliValinta = ValittuAvain != null;
            ValittuAvain = null;
            odottava = null;
            Pois = false;
            SuljeKortti();
            MerkitsePois();
            PaivitaLuonnehdinta();
            SiirraPeukalo();
            if (oliValinta || muuttui) Valittu?.Invoke(null);
            if (muuttui) PoisMuuttui?.Invoke(false);
        }

        static string LueTallennettu()
        {
            var s = PlayerPrefs.GetString(TallennusAvain, null);
            return string.IsNullOrEmpty(s) ? null : s;
        }

        void SiirraPeukalo()
        {
            string kohde = ValittuAvain;
            if (kohde == null && Pois) kohde = rivit.Keys.FirstOrDefault(k => OnPois(k) && Ryhmassa(rivit[k]).resolvedStyle.display != DisplayStyle.None);
            // Löydös 169: ei valintaa eikä Pois → peukalo Kaikki-rivillä.
            else if (kohde == null) kohde = rivit.Keys.FirstOrDefault(k => OnKaikki(k) && Ryhmassa(rivit[k]).resolvedStyle.display != DisplayStyle.None);
            if (kohde == null || !rivit.TryGetValue(kohde, out var r) || Ryhmassa(r).resolvedStyle.display == DisplayStyle.None
                || float.IsNaN(r.layout.height))
            {
                peukalo.style.display = DisplayStyle.None;
                return;
            }
            peukalo.style.display = DisplayStyle.Flex;
            float yla = r.ChangeCoordinatesTo(lista, Vector2.zero).y;
            peukalo.style.translate = new Translate(0, yla);
            peukalo.style.height = r.layout.height;
        }

        /// <summary>
        /// Maakuntakartassa lapun sisällön vaihto (ohje → maakunta → toinen maakunta) liukuu uuteen kokoon (Tiivistys, 250 ms)
        /// eikä hyppää (omistaja 29.9.2026: lapun avaus ja sulku animoiden, Raamattu PR #3602).
        /// </summary>
        void PaivitaLuonnehdinta()
        {
            if (listaPiilossa && Karttatila && kuvaus.panel != null && kuvaus.resolvedStyle.display == DisplayStyle.Flex)
                Tiivistys.AnimoiKoko(kuvaus, PaivitaLuonnehdintaHeti);
            else PaivitaLuonnehdintaHeti();
        }

        void PaivitaLuonnehdintaHeti()
        {
            kuvaus.Clear();
            if (ValittuAvain == null && listaPiilossa)
            {
                // Maakuntakartta ilman valintaa: ohje, mistä valitaan.
                kuvaus.style.display = DisplayStyle.Flex;
                Kirjasimet.Aseta(Rakenne.Teksti(Kieli.T("ui.maakunnat.napauta-kartalla"), "mk-maakunnat__lteksti mk-maakunnat__ohje", kuvaus), Kirjasin.Luku);
                return;
            }
            if (ValittuAvain == null) { kuvaus.style.display = DisplayStyle.None; return; }
            string avain = ValittuAvain, nimi = Nimi(avain);
            var data = HaeLuonnehdinta(avain);
            kuvaus.style.display = DisplayStyle.Flex;
            var n = Rakenne.Teksti(nimi.ToUpperInvariant(), "mk-maakunnat__lnimi", kuvaus);
            Kirjasimet.Aseta(n, Kirjasin.Kone);
            var rivi = Rakenne.El("mk-maakunnat__lrivi", kuvaus, PickingMode.Ignore);
            // Löydös 115 (omistaja, build 14): pieni kuva maakunnasta tekstin vasemmalle, kun datassa on kuva (nyt kortin
            // ensimmäinen kuva; Sisältökirjuri voi tilata omat pikkukuvat samaan kenttään). Ilman kuvaa ruutu ennallaan.
            // Löydös 158: oma pikkukuva ensin, varana kortin ensimmäinen kuva.
            string pikku = data == null ? null : !string.IsNullOrEmpty(data.Pikkukuva) ? data.Pikkukuva
                : data.Kuvat.Count > 0 ? MiniJson.Teksti(data.Kuvat[0], "pikku") ?? MiniJson.Teksti(data.Kuvat[0], "osoite") : null;
            // Löydös 170b (omistaja 19.3x): kuvan paikka näkyy aina minitekstin kyljessä; kuvan puuttuessa (tai haun
            // epäonnistuessa) vaalea paikkakuva pienellä karttaikonilla, kunnes Sisältökirjurin kuva tulee pakettiin.
            var kuva = Rakenne.El("mk-maakunnat__lkuva", rivi);
            var paikka = new SvgIkoni(Ikonit.Viiva["taitekartta"]);
            paikka.AddToClassList("mk-maakunnat__lpaikka");
            kuva.Add(paikka);
            if (!string.IsNullOrEmpty(pikku))
                Kuvat.Hae(pikku, tx =>
                {
                    if (tx == null) return;
                    kuva.style.backgroundImage = new StyleBackground(tx);
                    paikka.RemoveFromHierarchy();
                });
            if (data != null) kuva.RegisterCallback<ClickEvent>(_ => AvaaKortti(avain));
            var t = Rakenne.Teksti(data?.Lyhyt ?? Kieli.T("ui.maakunnat.tulossa"), "mk-maakunnat__lteksti", rivi);
            Kirjasimet.Aseta(t, Kirjasin.Luku);
            if (data != null)
            {
                // Löydös 116 (omistaja, build 14; Fablen valinta): ⊕ pois, tekstin loppuun "Lue lisää". Koko teksti on
                // napautettava (pieni linkki yksinään olisi liian pieni osuma).
                t.enableRichText = true;
                t.text = (data.Lyhyt ?? "") + " <color=#7a5514><u>" + Kieli.T("ui.maakunnat.lue-lisaa") + "</u></color>";   // kieli: ei (rich text -merkintä, sana avaimena)
                t.pickingMode = PickingMode.Position;
                t.tooltip = Kieli.T("ui.maakunnat.lisaa-alueesta");
                t.RegisterCallback<ClickEvent>(_ => AvaaKortti(avain));
            }
        }

        // --- testi ---------------------------------------------------------------------

        /// <summary>Testikomento "ui maakunnat kysymys n": kortin n:s kysymys auki/kiinni, mitat lokiin.</summary>
        public string TestiKysymys(int n)
        {
            if (!KorttiAuki) return "maakunta ei auki nostokortissa";
            var k = HaePulu(ValittuAvain);
            if (n >= k.Count) return $"kysymyksiä {k.Count}";
            Kortti.Testaa(null, "kysy", null);
            if (n >= 0) UiNakymat.Hae()?.Chat.VastaaValmiilla(k[n].Q, k[n].A, null);
            return n < 0 ? $"Kysy → chat, {k.Count} kysymystä" : $"kysymys {n + 1}/{k.Count} → Pulun chat";
        }
        public string VaistoKuvaus => "maakunta nostokortissa " + (KorttiAuki ? "auki: " + Kortti.Kuvaus : "kiinni");

        /// <summary>Testikomento "ui maakunnat kartta [pois]": minikartta suureksi tai takaisin.</summary>
        public string TestiKartta(bool suureksi)
        {
            if (!KorttiAuki) return "maakunta ei auki nostokortissa";
            string tulos = null;
            Kortti.Testaa(null, suureksi ? "kartta" : "kartta-pois", t => tulos = t);
            return tulos ?? "minikartta " + (suureksi ? "suureksi" : "takaisin");
        }

        /// <summary>Testikomento: valitse avain ("ISO:tunnus") ja avaa tarvittaessa kortti.</summary>
        public void Testaa(string avain, bool korttiAuki)
        {
            Avautui();
            UiKerros.Hae().StartCoroutine(Odota());
            System.Collections.IEnumerator Odota()
            {
                while (haussa) yield return null;
                if (!rakennettu) yield break;
                if (avain != null && Kelpaa(avain))
                {
                    var iso = Jaa(avain).Iso;
                    foreach (var muu in ryhmat.Keys.ToList()) AsetaRyhma(muu, muu == iso);
                    Valitse(avain);
                }
                if (korttiAuki && ValittuAvain != null)
                {
                    var data = HaeLuonnehdinta(ValittuAvain);
                    if (data != null) AvaaKortti(ValittuAvain);
                }
            }
        }
    }

    /// <summary>
    /// Maakunnan minikartan suurennos (omistajan kortti 30.9.2026 klo 22.5x: "klikata suuremmaksi minipopup tyyliin jolloin se
    /// animoidusti suurenisi ruudulle"): kartta kasvaa kyljestä ruudun keskelle (enintään 90 % ruudusta, oma muoto), tausta
    /// himmenee; napautus tai Esc palauttaa. Entisestä maakuntakortista; maakunta avautuu nyt nostokorttiin (omistaja 6.10.).
    /// </summary>
    public sealed class MinikartanSuurennos
    {
        public const float KylkiOsuus = 0.30f, KylkiKatto = 220f;
        const float KarttaMs = 220f;
        /// <summary>Suurennoksen piirron yläraja (2 × 1024 ylinäytteistettynä ≈ 50 Mt hetkellisesti; iPhone tarvitsee ~1 060).</summary>
        const int IsoLeveys = 1024;
        Texture2D terava;
        readonly VisualElement juuri;
        VisualElement karttaTausta, karttaIso, kylki;
        IVisualElementScheduledItem karttaAnimaatio;

        public MinikartanSuurennos(VisualElement juuri) { this.juuri = juuri; }

        public bool Auki => karttaIso != null;

        public void Avaa(VisualElement mista, Texture2D kartta)
        {
            if (karttaIso != null) return;
            kylki = mista;
            var alku = juuri.WorldToLocal(mista.worldBound);
            var pohja = juuri.layout;
            float suhde = kartta.height / (float)kartta.width;
            float lev = Mathf.Min(pohja.width * 0.9f, pohja.height * 0.9f / suhde, 900f);
            var loppu = new Rect((pohja.width - lev) / 2f, (pohja.height - lev * suhde) / 2f, lev, lev * suhde);
            karttaTausta = Rakenne.El("mk-maakuntaKortti__karttatausta", juuri);
            karttaTausta.focusable = true;
            karttaIso = Rakenne.El("mk-maakuntaKortti__karttaiso", karttaTausta, PickingMode.Ignore);
            karttaIso.style.backgroundImage = new StyleBackground(kartta);
            // Terävyys (Päätoimittaja 8.10.2026): kylkikartta on 512 px, suurennos jopa 900 pt → piirretään laitteen
            // tarkkuudella (enintään IsoLeveys) avauksen jälkeen ja vaihdetaan päälle; vapautetaan sulkiessa.
            string avain = MaakuntaMinikartta.Avain(kartta);
            int px = Mathf.Min(IsoLeveys, Mathf.CeilToInt(lev * UiKerros.PikseliaPisteessa));
            if (avain != null && px > kartta.width)
                karttaTausta.schedule.Execute(() =>
                {
                    if (karttaIso == null) return;
                    var iso = MaakuntaMinikartta.Hae(avain, px);
                    if (iso == null) return;
                    if (karttaIso == null) { UnityEngine.Object.Destroy(iso); return; }
                    terava = iso;
                    karttaIso.style.backgroundImage = new StyleBackground(iso);
                }).StartingIn((long)KarttaMs + 20);
            karttaTausta.RegisterCallback<PointerDownEvent>(e => { e.StopPropagation(); Sulje(false); });
            karttaTausta.RegisterCallback<KeyDownEvent>(e => { if (e.keyCode == KeyCode.Escape) { e.StopPropagation(); Sulje(false); } });
            Animoi(alku, loppu, 0f, 0.45f, null);
            karttaTausta.schedule.Execute(() => karttaTausta?.Focus());
            Debug.Log($"MATKAKIRJA ui: maakunnan minikartta suureksi ({kartta.width} × {kartta.height})");
        }

        public void Sulje(bool heti)
        {
            if (karttaTausta == null) return;
            var tausta = karttaTausta;
            var vapautettava = terava; terava = null;
            if (heti || kylki?.panel == null || karttaIso == null)
            {
                karttaAnimaatio?.Pause();
                tausta.RemoveFromHierarchy();
                karttaTausta = karttaIso = null;
                if (vapautettava != null) UnityEngine.Object.Destroy(vapautettava);
                return;
            }
            var nyt = new Rect(karttaIso.layout.position, karttaIso.layout.size);
            Animoi(nyt, juuri.WorldToLocal(kylki.worldBound), 0.45f, 0f, () =>
            {
                tausta.RemoveFromHierarchy();
                if (karttaTausta == tausta) karttaTausta = karttaIso = null;
                if (vapautettava != null) UnityEngine.Object.Destroy(vapautettava);
            });
        }

        /// <summary>Kuvan paikka ja koko sekä taustan himmennys KarttaMs:ssa (ease-out-cubic); pieni liike: heti.</summary>
        void Animoi(Rect a, Rect b, float tummaA, float tummaB, Action valmis)
        {
            karttaAnimaatio?.Pause();
            var iso = karttaIso;
            var tausta = karttaTausta;
            float kesto = LinssiUi.VahennettyLiike() ? 0f : KarttaMs;
            float t0 = Time.unscaledTime;
            void Aseta(float x)
            {
                float k = 1f - (1f - x) * (1f - x) * (1f - x);
                iso.style.left = Mathf.Lerp(a.x, b.x, k);
                iso.style.top = Mathf.Lerp(a.y, b.y, k);
                iso.style.width = Mathf.Lerp(a.width, b.width, k);
                iso.style.height = Mathf.Lerp(a.height, b.height, k);
                tausta.style.backgroundColor = new Color(18f / 255f, 12f / 255f, 4f / 255f, Mathf.Lerp(tummaA, tummaB, k));
            }
            Aseta(0f);
            karttaAnimaatio = tausta.schedule.Execute(() =>
            {
                float x = kesto <= 0f ? 1f : Mathf.Clamp01((Time.unscaledTime - t0) * 1000f / kesto);
                Aseta(x);
                if (x >= 1f) { karttaAnimaatio?.Pause(); valmis?.Invoke(); }
            }).Every(16);
        }
    }
}
