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
//              oikealla, Pulun kysymykset (napautus → Pulun chat valmiilla vastauksella; MaakuntaKortti).
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
        readonly MaakuntaKortti kortti;
        readonly Dictionary<string, Button> rivit = new Dictionary<string, Button>();
        readonly Dictionary<string, (Button Otsikko, VisualElement Rivit)> ryhmat = new Dictionary<string, (Button, VisualElement)>();
        List<Maa> maat;
        Dictionary<string, object> luonnehdinnat, pulu;
        bool haussa, rakennettu;
        VisualElement vedettava;
        string sovellettuIso = "";
        Matka kuunneltu;

        public bool KorttiAuki => kortti.Auki;

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
            tila = Rakenne.Teksti("Ladataan…", "mk-maakunnat__tila", lista);
            eiMaakuntia = Rakenne.Teksti("Tälle maalle ei ole vielä maakuntia", "mk-maakunnat__tila", lista);
            eiMaakuntia.style.display = DisplayStyle.None;

            kuvaus = Rakenne.El("mk-maakunnat__luonnehdinta", juuri);
            kuvaus.style.display = DisplayStyle.None;
            kortti = new MaakuntaKortti(kerros);
            ValittuAvain = LueTallennettu();
            try { Pois = PlayerPrefs.GetInt(PoisAvain, 0) == 1; } catch (Exception) { }
        }

        /// <summary>Välilehti avattiin: data haetaan ja lista rakennetaan ensimmäisellä kerralla.</summary>
        public void Avautui()
        {
            if (rakennettu || haussa) { if (rakennettu) { SovitaMaa(); SiirraPeukalo(); } return; }
            haussa = true;
            tila.text = "Ladataan…";
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
            if (rakennettu) { odottava = null; Valitse(avain); return; }
            odottava = avain;
            Avautui();
        }

        public void SuljeKortti() => kortti.Sulje();

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
                tila.text = "Maakuntia ei saatu ladattua.";
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
                    Kirjasimet.Aseta(Rakenne.Teksti("Kaikki", "mk-maakunnat__nimi", kaikkiRivi), Kirjasin.Luku);
                    kaikkiRivi.tooltip = "Koko maa, ei rajausta";
                    kaikkiRivi.pickingMode = PickingMode.Ignore;
                    kaikkiRivi.userData = kaikkiAvain;
                    rivit[kaikkiAvain] = kaikkiRivi;
                    string poisAvain = iso + PoisTunnus;
                    var poisRivi = Rakenne.Nappi(null, "mk-maakunnat__rivi mk-maakunnat__rivi--pois", () => Valitse(poisAvain), valinnat);
                    Kirjasimet.Aseta(Rakenne.Teksti("Pois", "mk-maakunnat__nimi", poisRivi), Kirjasin.Luku);
                    poisRivi.tooltip = "Maakunnat pois kartalta";
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
            if (odotettu != null && Karttatila) Valitse(odotettu);
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
            kortti.Sulje();
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
                Kirjasimet.Aseta(Rakenne.Teksti("Napauta maakuntaa kartalla.", "mk-maakunnat__lteksti mk-maakunnat__ohje", kuvaus), Kirjasin.Luku);
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
            if (data != null) kuva.RegisterCallback<ClickEvent>(e => kortti.Avaa(avain, nimi, MaanNimi(avain), data.Pitka ?? data.Lyhyt, data.Kuvat, HaePulu(avain), e.position));
            var t = Rakenne.Teksti(data?.Lyhyt ?? "Luonnehdinta tulossa.", "mk-maakunnat__lteksti", rivi);
            Kirjasimet.Aseta(t, Kirjasin.Luku);
            if (data != null)
            {
                // Löydös 116 (omistaja, build 14; Fablen valinta): ⊕ pois, tekstin loppuun "Lue lisää". Koko teksti on
                // napautettava (pieni linkki yksinään olisi liian pieni osuma).
                t.enableRichText = true;
                t.text = (data.Lyhyt ?? "") + " <color=#7a5514><u>Lue lisää</u></color>";
                t.pickingMode = PickingMode.Position;
                t.tooltip = "Lisää alueesta";
                t.RegisterCallback<ClickEvent>(e => kortti.Avaa(avain, nimi, MaanNimi(avain), data.Pitka ?? data.Lyhyt, data.Kuvat, HaePulu(avain), e.position));
            }
        }

        // --- testi ---------------------------------------------------------------------

        /// <summary>Testikomento "ui maakunnat kysymys n": kortin n:s kysymys auki/kiinni, mitat lokiin.</summary>
        public string TestiKysymys(int n) => kortti.TestiKysymys(n);

        /// <summary>Testikomento "ui maakunnat kartta [pois]": minikartta suureksi tai takaisin.</summary>
        public string TestiKartta(bool suureksi) => kortti.TestiKartta(suureksi);

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
                    if (data != null) kortti.Avaa(ValittuAvain, Nimi(ValittuAvain), MaanNimi(ValittuAvain), data.Pitka ?? data.Lyhyt, data.Kuvat, HaePulu(ValittuAvain));
                }
            }
        }
    }

    /// <summary>
    /// Alueen kortti (webin .maakunta-kortti): kelluva paperi kevyen himmennyksen päällä,
    /// ✕ ja napautus kortin ohi sulkevat. Valikkokerroksessa (40), pallo lukittu.
    ///
    /// OMISTAJAN KORTTI 30.9.2026 KLO 22.5X (Länsi-Makedonia, Pelikoodari):
    ///   1) Pulun kysymykset: kortissa Pulun kuvake ja kysymys (kaikki 2–3), vastausta ei näytetä kortissa. Napautus avaa
    ///      Pulun chatin kortin päälle: kysymys pelaajan viestinä ja valmis vastaus heti ilman tekoälykutsua
    ///      (PuluChat.VastaaValmiilla); jatkokysymykset kulkevat maakunnan aiheella.
    ///   2) Kuva nostokortin mitoilla ("oudon matala eikä ole linjassa muiden nostojen kanssa"): koko leveys, kuvan oma
    ///      muoto korkeuskattoon asti (Nostokortti.Kuvakehys: turva-alue − 150 pt, vähintään 28 %), toinen kuva (kuva2)
    ///      selattavana (KuvaSelaus: pyyhkäisy ja reunanapautus; laskuri "1 / 2").
    ///   3) Havainnekuva: maakunnan minikartta omasta aineistosta (MaakuntaMinikartta) tekstin oikealla (30 % palstasta,
    ///      enintään 220 pt; Lehtipalstat-kylkikuva), napautus suurentaa sen animoidusti paikaltaan ruudun keskelle
    ///      (220 ms), napautus tai Esc palauttaa.
    /// </summary>
    public sealed class MaakuntaKortti
    {
        readonly UiKerros kerros;
        readonly VisualElement himmennys, kortti, kuvat, tekstiPaikka;
        readonly ScrollView sisalto;
        readonly Label otsikko;
        readonly VisualElement puluLohko;
        /// <summary>Kuvan kokoruutusuurennos (omistaja 28.9.2026): sama komponentti ja asetukset kuin Nostokortti.</summary>
        readonly Kuvasuurennos suurennos;
        // NOSTOKORTTI-pohja (omistaja 1.10.2026): paikka ja vetokahva kuten nostokortilla (Pohja.NostokortinPaikka).
        readonly Vetokahva kahva;
        bool laajennettu;
        public bool Auki { get; private set; }
        /// <summary>Jokin maakuntakortti auki (UiNakymat.ChatinKerros: chat nousee kortin päälle kuten nostokortissa).</summary>
        public static bool JokinAuki { get; private set; }
        /// <summary>
        /// Omistaja 29.9.2026 klo 07.4x (kaappaukset maakuntakortti-kiinni/-kysymys-auki): "Ikkunan koko ei saa muuttua kun
        /// noita klikkaa auki." Kortin korkeus lukitaan avauksen jälkeiseen asetteluun (koko ja paikka kiinteät).
        /// </summary>
        bool lukitaan, avautuu;
        /// <summary>Avanneen napautuksen kohta paneelin koordinaateissa: kortin origo (web: ⊕-napin keskipiste avaushetkellä).</summary>
        Vector2? lahto;
        IVisualElementScheduledItem vieritys;
        /// <summary>Kuvan korkeuskatto (Mitoita; sama kaava kuin Nostokortti: turva-alue − 150 pt, vähintään 28 %).</summary>
        float kuvaKatto;
        float avattu;
        int kuvaIndeksi;
        string avain;
        PuluChat.Aihe aihe;
        /// <summary>Suurennettu minikartta (tausta ja kuva) tai null.</summary>
        VisualElement karttaTausta, karttaIso;
        IVisualElementScheduledItem karttaAnimaatio;
        const float KarttaOsuus = 0.30f, KarttaKatto = 220f, KarttaMs = 220f;
        const string RiviValiAlku = "<line-height=1.58em>";

        public MaakuntaKortti(UiKerros kerros)
        {
            this.kerros = kerros;
            himmennys = Rakenne.El("mk-himmennys mk-maakuntaKortti__kerros", kerros.Juuri(UiKerros.Valikot));
            himmennys.style.display = DisplayStyle.None;
            himmennys.RegisterCallback<PointerDownEvent>(e => { if (e.target == himmennys) Sulje(); });
            // Omistaja 28.9.2026: kortti saman kokoinen kuin nostokortti — mk-nosto-luokka + sama leveyskaava
            // (Nostokortti.LaskeLeveys), ei omaa ulkoasua (mieluummin lisätty nostokortin luokka tähän kuin
            // muutettu nostokortin tyylejä).
            himmennys.RegisterCallback<GeometryChangedEvent>(_ => Mitoita());
            kortti = Rakenne.El("mk-maakuntaKortti mk-nosto", himmennys);
            kortti.RegisterCallback<GeometryChangedEvent>(_ =>
            {
                if (!lukitaan || kortti.layout.height <= 0 || float.IsNaN(kortti.layout.height)) return;
                lukitaan = false;
                // Korkeus tulee pohjasta (Paikka: kiinteä 45 % / laajennettuna 85 %), joten koko ei muutu sisällön mukana.
                // Origo avanneesta kohdasta, kun kortin paikka on tiedossa; kasvu alkaa vasta tämän jälkeen (ei hyppyä
                // origon vaihtuessa kesken). Ilman kohtaa (testikomento) keskeltä.
                // Skaalaamaton laatikko (worldBound sisältäisi kesken olevan 0,92-mittakaavan).
                var r = new Rect(himmennys.worldBound.position + kortti.layout.position, kortti.layout.size);
                var o = lahto ?? r.center;
                kortti.style.transformOrigin = new TransformOrigin(
                    Mathf.Clamp(o.x - r.x, 0f, r.width), Mathf.Clamp(o.y - r.y, 0f, r.height), 0f);
                if (avautuu) { avautuu = false; himmennys.schedule.Execute(() => { if (Auki) himmennys.AddToClassList("mk-auki"); }); }
            });
            // NOSTOKORTTI-pohja: ei ✕:ää (ohinapautus, veto alas, Esc); piilotettu nappi poistettu (✕-inventaario 5.10.2026).
            kahva = new Vetokahva(kortti, l => { laajennettu = l; Paikka(); }, Sulje, () => laajennettu);
            Nappaimisto.Rekisteroi("maakuntakortti", 60, () => Auki, null, null, Sulje);
            sisalto = new ScrollView(ScrollViewMode.Vertical);
            sisalto.AddToClassList("mk-maakuntaKortti__sisalto");
            sisalto.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            sisalto.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Add(sisalto);
            // NOSTOKORTTI-pohja (web #3791): kapiteeli "MAAKUNTA" otsikon yläpuolella.
            Kirjasimet.Aseta(Rakenne.Teksti("MAAKUNTA", "mk-maakuntaKortti__kapiteeli", sisalto), Kirjasin.Kone);
            otsikko = Rakenne.Teksti("", "mk-maakuntaKortti__otsikko", sisalto);
            Kirjasimet.Aseta(otsikko, Kirjasin.LukuLihava);
            kuvat = Rakenne.El("mk-maakuntaKortti__kuvat", sisalto, PickingMode.Ignore);
            tekstiPaikka = Rakenne.El("mk-maakuntaKortti__tekstit", sisalto, PickingMode.Ignore);
            puluLohko = Rakenne.El("mk-maakuntaKortti__pulu", sisalto, PickingMode.Ignore);
            // Teksti (Lehtipalstat) ja kuva asettuvat vasta muutaman asettelun jälkeen: lukitaan korkeus uudelleen, kun
            // sisältö kasvaa avauksen jälkeen (1.10. simulaattorikuva: kortti lukittui pelkän kuvan korkeuteen).
            sisalto.contentContainer.RegisterCallback<GeometryChangedEvent>(e =>
            {
                if (Auki && Time.realtimeSinceStartup - avattu < 2f && e.newRect.height > e.oldRect.height + 0.5f) Lukitse();
            });
            // Kuvan napautus kokoruudulle (omistaja 28.9.2026): sama Kuvasuurennos-komponentti kuin Nostokortti.
            suurennos = new Kuvasuurennos(kerros.Juuri(UiKerros.Valikot)) { Tayteen = true, Kokoruutu = true };
        }

        /// <summary>Sama leveyskaava kuin Nostokortti.Mitoita (Nostokortti.LaskeLeveys): kortit samankokoisia.</summary>
        void Mitoita()
        {
            var pohja = himmennys.panel?.visualTree.layout ?? default;
            var t = kerros.Reunat(UiKerros.Valikot);
            float rl = pohja.width - t.x - t.z, rk = pohja.height - t.y - t.w;
            if (float.IsNaN(rl) || float.IsNaN(rk) || rl <= 0 || rk <= 0)
            {
                kortti.style.width = StyleKeyword.Null;
                kortti.style.maxWidth = StyleKeyword.Null;
                return;
            }
            // Nostokortti.Mitoita: kuvan korkeuskatto turva-alue − 150 pt, vähintään 28 %.
            kuvaKatto = Mathf.Round(Mathf.Max(rk - 150f, rk * 0.28f));
            float leveys = Nostokortti.LaskeLeveys(rl, rk);
            if (kortti.style.width.value.value != leveys) { kortti.style.width = leveys; kortti.style.maxWidth = leveys; Lukitse(); }
            Paikka();
        }

        void Paikka()
        {
            if (!Auki) return;
            bool kapea = Pohja.NostokortinPaikka(himmennys, kortti, laajennettu, kiintea: true);
            kahva.Juuri.style.display = kapea ? DisplayStyle.Flex : DisplayStyle.None;
        }

        /// <summary>Korkeus vapaaksi ja uudelleen lukkoon seuraavassa asettelussa (uusi alue tai leveyden muutos).</summary>
        void Lukitse()
        {
            lukitaan = true;
            Paikka();
        }

        /// <param name="avainTunnus">"ISO:tunnus" (minikartta)</param>
        /// <param name="maaNimi">maan nimi Pulun kontekstiin (voi puuttua)</param>
        public void Avaa(string avainTunnus, string nimi, string maaNimi, string pitka, IReadOnlyList<Dictionary<string, object>> kuvalista,
            IReadOnlyList<(string Q, string A)> kysymykset, Vector2? lahtopiste = null)
        {
            if (!Auki) lahto = lahtopiste;
            avain = avainTunnus;
            aihe = new PuluChat.Aihe
            {
                Otsake = "Maakuntakortti, josta pelaaja kysyy",
                Nimi = string.IsNullOrEmpty(maaNimi) ? nimi : $"{nimi} ({maaNimi})",
                Tyyppi = "maakunta",
                Teksti = pitka,
            };
            SuljeKartta(true);
            otsikko.text = nimi;
            kuvaIndeksi = 0;
            TaytaKuvat(kuvalista);
            TaytaTeksti(pitka);
            TaytaPulu(kysymykset);
            vieritys?.Pause();
            sisalto.scrollOffset = Vector2.zero;
            avattu = Time.realtimeSinceStartup;
            Lukitse();
            if (Auki) return;
            Auki = JokinAuki = true;
            laajennettu = false;
            Paikka();
            Mitoita();
            // Avaus: näkyviin ilman mk-auki-luokkaa; luokka (kasvu ja häivytys) vasta kun korkeus ja origo on lukittu (yllä).
            // Uusi versio kumoaa kesken olevan sulun viivästetyn piilotuksen (Rakenne.Nayta).
            bool pieni = LinssiUi.VahennettyLiike();
            kortti.style.transitionDuration = pieni ? new StyleList<TimeValue>(new List<TimeValue> { new TimeValue(0f) }) : StyleKeyword.Null;
            himmennys.style.transitionDuration = kortti.style.transitionDuration;
            himmennys.userData = new object();
            himmennys.RemoveFromClassList("mk-auki");
            himmennys.style.display = DisplayStyle.Flex;
            avautuu = true;
            // Varmistus: jos asettelu ei kerro uutta kokoa (GeometryChanged), kortti ei saa jäädä näkymättömäksi.
            himmennys.schedule.Execute(() => { if (Auki && avautuu) { avautuu = false; himmennys.AddToClassList("mk-auki"); } }).StartingIn(120);
            SyoteLukko.Esta(this);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = JokinAuki = false;
            laajennettu = false;
            suurennos.Sulje();
            SuljeKartta(true);
            avautuu = false;
            // Sulku samaa reittiä avanneeseen kohtaan (origo pysyy), 200 ms + 40 ms kuten webissä; pieni liike: heti.
            Rakenne.Nayta(himmennys, false, LinssiUi.VahennettyLiike() ? 0 : 240);
            SyoteLukko.Vapauta(this);
        }

        // --- kuvat (nostokortin mitoilla, selattava) -----------------------------------------------------------------

        void TaytaKuvat(IReadOnlyList<Dictionary<string, object>> lista)
        {
            kuvat.Clear();
            kuvat.style.display = lista.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            if (lista.Count == 0) return;
            var sarja = lista.Select(MaakuntaLehtikuva).ToList();
            var paikka = Rakenne.El("mk-maakuntaKortti__kuvapaikka", kuvat, PickingMode.Ignore);
            var lahde = Rakenne.Teksti("", "mk-maakuntaKortti__lahde", kuvat);
            Kirjasimet.Aseta(lahde, Kirjasin.Kone);
            void Nayta(int i)
            {
                kuvaIndeksi = (i + lista.Count) % lista.Count;
                paikka.Clear();
                var k = lista[kuvaIndeksi];
                int kohta = kuvaIndeksi;
                var kehys = Kuvakehys(paikka, MiniJson.Teksti(k, "osoite"), () => suurennos.Avaa(sarja, kohta));
                if (lista.Count > 1)
                    Kirjasimet.Aseta(Rakenne.Teksti($"{kuvaIndeksi + 1} / {lista.Count}", "mk-nosto__laskuri", kehys), Kirjasin.Kone);
                string rivi = KuvanLahde(k, MiniJson.Teksti(k, "osoite"));
                lahde.text = rivi;
                lahde.style.display = rivi.Length > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            }
            // Pyyhkäisy ja reunanapautus selaavat, keskiosa suurentaa (Nostokortti.Kuvasarja, löydös 34).
            new KuvaSelaus(paikka, () => lista.Count, s => Nayta(kuvaIndeksi + s), () => paikka.childCount > 0 ? paikka[0] : paikka);
            Nayta(0);
        }

        /// <summary>
        /// Nostokortti.Kuvakehys: koko leveys, korkeus kuvan omasta muodosta enintään kuvaKatto; ennen latausta 3:2.
        /// </summary>
        VisualElement Kuvakehys(VisualElement isa, string osoite, Action napautus)
        {
            var kehys = Rakenne.El("mk-nosto__kuvakehys", isa);
            var kuva = Rakenne.El("mk-nosto__kuva", kehys, PickingMode.Ignore);
            kehys.RegisterCallback<ClickEvent>(_ => napautus?.Invoke());
            kehys.userData = 2f / 3f;
            void Korkeus(float w)
            {
                if (float.IsNaN(w) || w <= 0) return;
                float h = w * (kehys.userData is float s ? s : 2f / 3f);
                if (kuvaKatto > 0f) h = Mathf.Min(h, kuvaKatto);
                h = Mathf.Round(h);
                if (kehys.style.height.value.value != h) kehys.style.height = h;
            }
            kehys.RegisterCallback<GeometryChangedEvent>(e => Korkeus(e.newRect.width));
            if (!string.IsNullOrEmpty(osoite))
                Kuvat.Hae(osoite, t =>
                {
                    if (t == null) return;
                    kuva.style.backgroundImage = new StyleBackground(t);
                    if (t.width <= 0 || t.height <= 0) return;
                    kehys.userData = t.height / (float)t.width;
                    kehys.AddToClassList("mk-nosto__kuvakehys--ladattu");
                    Korkeus(kehys.layout.width);
                });
            return kehys;
        }

        /// <summary>Lähderivi täydennettynä Commonsin tekijällä ja lisenssillä, jos puuttuu (web taytaLahderivi, #3438).</summary>
        static string KuvanLahde(Dictionary<string, object> k, string osoite)
        {
            string lahde = string.Join(" · ", new[] { MiniJson.Teksti(k, "lahde"), MiniJson.Teksti(k, "lisenssi") }.Where(s => !string.IsNullOrEmpty(s)));
            return Kuvatekija.Taydenna(lahde, MiniJson.Teksti(k, "tiedosto") ?? osoite) ?? "";
        }

        /// <summary>Maakunnan kuva Kuvasuurennokselle (sama kuvatyyppi kuin nostokortin kuvasarjassa).</summary>
        static LehtiKuva MaakuntaLehtikuva(Dictionary<string, object> k)
        {
            string osoite = MiniJson.Teksti(k, "osoite");
            return new LehtiKuva { Lahde = osoite, LahdeRivi = KuvanLahde(k, osoite) };
        }

        // --- teksti ja minikartta ------------------------------------------------------------------------------------

        void TaytaTeksti(string pitka)
        {
            tekstiPaikka.Clear();
            var kappaleet = Kappalejako.Jaa(pitka ?? "").Select(k => k.Replace("<", "<noparse><</noparse>")).ToList();
            var kartta = MaakuntaMinikartta.Hae(avain);
            if (kartta == null)
            {
                foreach (var k in kappaleet) Kirjasimet.Aseta(Rakenne.Teksti(RiviValiAlku + k, "mk-maakuntaKortti__teksti", tekstiPaikka), Kirjasin.Luku);
                return;
            }
            var kylki = Rakenne.El("mk-maakuntaKortti__kartta", null);
            kylki.style.backgroundImage = new StyleBackground(kartta);
            float suhde = kartta.height / (float)kartta.width;
            kylki.RegisterCallback<GeometryChangedEvent>(e =>
            {
                float h = Mathf.Round(e.newRect.width * suhde);
                if (e.newRect.width > 0 && Mathf.Abs(kylki.resolvedStyle.height - h) > 0.5f) kylki.style.height = h;
            });
            kylki.tooltip = "Suurenna kartta";
            kylki.RegisterCallback<ClickEvent>(_ => SuurennaKartta(kylki, kartta));
            Lehtipalstat.Luo(tekstiPaikka, kappaleet, RiviValiAlku, "mk-maakuntaKortti__teksti", Kirjasin.Luku, null, kylki,
                palstoita: false, kylkiOsuus: KarttaOsuus, kylkiKatto: KarttaKatto);
        }

        /// <summary>
        /// Minipopup (omistaja: "klikata suuremmaksi minipopup tyyliin jolloin se animoidusti suurenisi ruudulle"): kartta
        /// kasvaa paikaltaan ruudun keskelle (enintään 90 % ruudusta, oma muoto), tausta himmenee; napautus tai Esc palauttaa.
        /// </summary>
        void SuurennaKartta(VisualElement kylki, Texture2D kartta)
        {
            if (karttaIso != null) return;
            var juuri = kerros.Juuri(UiKerros.Valikot);
            var alku = juuri.WorldToLocal(kylki.worldBound);
            var pohja = juuri.layout;
            float suhde = kartta.height / (float)kartta.width;
            float lev = Mathf.Min(pohja.width * 0.9f, pohja.height * 0.9f / suhde, 900f);
            var loppu = new Rect((pohja.width - lev) / 2f, (pohja.height - lev * suhde) / 2f, lev, lev * suhde);
            karttaTausta = Rakenne.El("mk-maakuntaKortti__karttatausta", juuri);
            karttaTausta.focusable = true;
            karttaIso = Rakenne.El("mk-maakuntaKortti__karttaiso", karttaTausta, PickingMode.Ignore);
            karttaIso.style.backgroundImage = new StyleBackground(kartta);
            karttaTausta.RegisterCallback<PointerDownEvent>(e => { e.StopPropagation(); SuljeKartta(false); });
            karttaTausta.RegisterCallback<KeyDownEvent>(e => { if (e.keyCode == KeyCode.Escape) { e.StopPropagation(); SuljeKartta(false); } });
            Animoi(alku, loppu, 0f, 0.45f, null);
            karttaTausta.schedule.Execute(() => karttaTausta?.Focus());
            Debug.Log($"MATKAKIRJA ui: maakuntakortti kartta suureksi {avain} ({kartta.width} × {kartta.height})");
        }

        void SuljeKartta(bool heti)
        {
            if (karttaTausta == null) return;
            var tausta = karttaTausta;
            var kylki = tekstiPaikka.Q(className: "mk-maakuntaKortti__kartta");
            if (heti || kylki == null || karttaIso == null)
            {
                karttaAnimaatio?.Pause();
                tausta.RemoveFromHierarchy();
                karttaTausta = karttaIso = null;
                return;
            }
            var juuri = kerros.Juuri(UiKerros.Valikot);
            var nyt = new Rect(karttaIso.layout.position, karttaIso.layout.size);
            Animoi(nyt, juuri.WorldToLocal(kylki.worldBound), 0.45f, 0f, () =>
            {
                tausta.RemoveFromHierarchy();
                if (karttaTausta == tausta) karttaTausta = karttaIso = null;
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

        /// <summary>Testikomento (ui maakunnat kartta): minikartta suureksi ja takaisin.</summary>
        public string TestiKartta(bool suureksi)
        {
            if (!Auki) return "kortti ei auki";
            var kylki = tekstiPaikka.Q(className: "mk-maakuntaKortti__kartta");
            if (kylki == null) return "ei minikarttaa (maakuntien aineisto ei ladattu?)";
            if (suureksi && kylki.resolvedStyle.backgroundImage.texture is Texture2D t) SuurennaKartta(kylki, t);
            else SuljeKartta(false);
            var r = kylki.worldBound;
            return $"minikartta {r.width:0} × {r.height:0} pt @ {r.x:0},{r.y:0}, suuri {(karttaIso != null ? "kyllä" : "ei")}";
        }

        // --- Pulun kysymykset ----------------------------------------------------------------------------------------

        IReadOnlyList<(string Q, string A)> kysymykset = new List<(string, string)>();
        VisualElement toimintorivi;

        /// <summary>
        /// NOSTOKORTTI-pohjan toimintorivi (web #3791, Päätoimittaja 1.10.): vain Kysy (maakunnalla ei visaa eikä lehtijuttua);
        /// Kysy avaa Pulun chatin, jossa kortin kysymykset ovat siruina valmiine vastauksineen (ei mallikutsua).
        /// </summary>
        void TaytaPulu(IReadOnlyList<(string Q, string A)> lista)
        {
            kysymykset = lista ?? new List<(string, string)>();
            puluLohko.Clear();
            puluLohko.style.display = DisplayStyle.None;
            toimintorivi?.RemoveFromHierarchy();
            toimintorivi = null;
            kortti.EnableInClassList("mk-nosto--toiminnot", kysymykset.Count > 0);
            if (kysymykset.Count == 0) return;
            toimintorivi = Rakenne.El("mk-nosto__toiminnot", kortti, PickingMode.Ignore);
            var b = Rakenne.Nappi("Kysy", "mk-nosto__toiminto", Kysy, toimintorivi);
            Kirjasimet.Aseta(b, Kirjasin.KoneLihava);
        }

        void Kysy() => UiNakymat.Hae()?.Chat.AvaaValmiilla(aihe, kysymykset);

        /// <summary>Testi: n:s kysymys kuten napautus (Pulun chat avautuu valmiilla vastauksella).</summary>
        public string TestiKysymys(int n)
        {
            if (!Auki) return "kortti ei auki";
            if (n < 0) { Kysy(); return $"Kysy → chat, {kysymykset.Count} kysymystä"; }
            if (n >= kysymykset.Count) return $"kysymyksiä {kysymykset.Count}";
            Kysy();
            UiNakymat.Hae()?.Chat.VastaaValmiilla(kysymykset[n].Q, kysymykset[n].A, aihe);
            return $"kysymys {n + 1}/{kysymykset.Count} → Pulun chat";
        }
    }
}
