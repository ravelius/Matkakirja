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
//   Kortti     kuvat (1–2 rinnakkain, useampi vaakavieritteenä, lähderivi),
//              pitkä teksti ja Pulun kysymykset (yksi vastaus auki kerrallaan).
//
// Data sisältöpaketista (LinssiSisalto-reitti, sama välimuisti):
//   moduulit/js/karttatyokalu-maakunnat.json  MAAKUNTIEN_NIMET, MAAKUNTIEN_MAAT
//   moduulit/js/packs/maakunnat-luonnehdinnat.json  { lyhyt, pitka, kuva }
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

        void PaivitaLuonnehdinta()
        {
            kuvaus.Clear();
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
            if (data != null) kuva.RegisterCallback<ClickEvent>(_ => kortti.Avaa(nimi, data.Pitka ?? data.Lyhyt, data.Kuvat, HaePulu(avain)));
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
                t.RegisterCallback<ClickEvent>(_ => kortti.Avaa(nimi, data.Pitka ?? data.Lyhyt, data.Kuvat, HaePulu(avain)));
            }
        }

        // --- testi ---------------------------------------------------------------------

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
                    if (data != null) kortti.Avaa(Nimi(ValittuAvain), data.Pitka ?? data.Lyhyt, data.Kuvat, HaePulu(ValittuAvain));
                }
            }
        }
    }

    /// <summary>
    /// Alueen kortti (webin .maakunta-kortti): kelluva paperi kevyen himmennyksen päällä,
    /// ✕ ja napautus kortin ohi sulkevat. Valikkokerroksessa (40), pallo lukittu.
    /// </summary>
    public sealed class MaakuntaKortti
    {
        readonly VisualElement himmennys, kortti, kuvat;
        readonly ScrollView sisalto;
        readonly Label otsikko, teksti;
        readonly VisualElement puluLohko;
        (Button Nappi, Label Vastaus) avoinVastaus;
        public bool Auki { get; private set; }

        public MaakuntaKortti(UiKerros kerros)
        {
            himmennys = Rakenne.El("mk-himmennys mk-maakuntaKortti__kerros", kerros.Juuri(UiKerros.Valikot));
            himmennys.style.display = DisplayStyle.None;
            himmennys.RegisterCallback<PointerDownEvent>(e => { if (e.target == himmennys) Sulje(); });
            kortti = Rakenne.El("mk-maakuntaKortti", himmennys);
            var sulje = Rakenne.Nappi("×", "mk-selite__sulje mk-maakuntaKortti__sulje", Sulje, kortti);
            sulje.tooltip = "Sulje";
            sisalto = new ScrollView(ScrollViewMode.Vertical);
            sisalto.AddToClassList("mk-maakuntaKortti__sisalto");
            sisalto.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            sisalto.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Add(sisalto);
            sulje.BringToFront();
            otsikko = Rakenne.Teksti("", "mk-maakuntaKortti__otsikko", sisalto);
            Kirjasimet.Aseta(otsikko, Kirjasin.LukuLihava);
            kuvat = Rakenne.El("mk-maakuntaKortti__kuvat", sisalto, PickingMode.Ignore);
            teksti = Rakenne.Teksti("", "mk-maakuntaKortti__teksti", sisalto);
            Kirjasimet.Aseta(teksti, Kirjasin.Luku);
            puluLohko = Rakenne.El("mk-maakuntaKortti__pulu", sisalto, PickingMode.Ignore);
        }

        public void Avaa(string nimi, string pitka, IReadOnlyList<Dictionary<string, object>> kuvalista, IReadOnlyList<(string Q, string A)> kysymykset)
        {
            otsikko.text = nimi;
            teksti.text = pitka ?? "";
            TaytaKuvat(kuvalista);
            TaytaPulu(kysymykset);
            sisalto.scrollOffset = Vector2.zero;
            if (Auki) return;
            Auki = true;
            Rakenne.Nayta(himmennys, true, 220);
            SyoteLukko.Esta(this);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Rakenne.Nayta(himmennys, false, 220);
            SyoteLukko.Vapauta(this);
        }

        void TaytaKuvat(IReadOnlyList<Dictionary<string, object>> lista)
        {
            kuvat.Clear();
            kuvat.style.display = lista.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            if (lista.Count == 0) return;
            // Kaksi rinnakkain, useampi vaakavieritteeseen (webin karuselli).
            VisualElement isa = kuvat;
            if (lista.Count > 2)
            {
                var v = new ScrollView(ScrollViewMode.Horizontal);
                v.AddToClassList("mk-maakuntaKortti__karuselli");
                v.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
                v.verticalScrollerVisibility = ScrollerVisibility.Hidden;
                kuvat.Add(v);
                isa = v.contentContainer;
                isa.style.flexDirection = FlexDirection.Row;
            }
            foreach (var k in lista)
            {
                var kehys = Rakenne.El("mk-maakuntaKortti__kuva" + (lista.Count > 2 ? " mk-maakuntaKortti__kuva--karuselli" : ""), isa, PickingMode.Ignore);
                var kuva = Rakenne.El("mk-maakuntaKortti__kuvapinta", kehys, PickingMode.Ignore);
                string osoite = MiniJson.Teksti(k, "osoite");
                if (!string.IsNullOrEmpty(osoite))
                    Kuvat.Hae(osoite, t => { if (t != null) kuva.style.backgroundImage = new StyleBackground(t); });
                string lahde = string.Join(" · ", new[] { MiniJson.Teksti(k, "lahde"), MiniJson.Teksti(k, "lisenssi") }.Where(s => !string.IsNullOrEmpty(s)));
                // Tekijä ja lisenssi Commonsista, jos puuttuu (web karttatyokalu-maakunnat taytaLahderivi, #3438).
                lahde = Kuvatekija.Taydenna(lahde, MiniJson.Teksti(k, "tiedosto") ?? osoite) ?? "";
                if (lahde.Length > 0)
                {
                    var l = Rakenne.Teksti(lahde, "mk-maakuntaKortti__lahde", kehys);
                    Kirjasimet.Aseta(l, Kirjasin.Kone);
                }
            }
        }

        void TaytaPulu(IReadOnlyList<(string Q, string A)> kysymykset)
        {
            puluLohko.Clear();
            avoinVastaus = default;
            puluLohko.style.display = kysymykset.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            foreach (var (q, a) in kysymykset)
            {
                Button nappi = null;
                nappi = Rakenne.Nappi(null, "mk-maakuntaKortti__kysymys", () => VaihdaVastaus(nappi, a), puluLohko, Ikonit.Puhekupla);
                var t = Rakenne.Teksti(q, "mk-maakuntaKortti__kysymysteksti", nappi);
                Kirjasimet.Aseta(t, Kirjasin.Luku);
            }
        }

        /// <summary>Yksi vastaus kerrallaan; sama napautus sulkee sen.</summary>
        void VaihdaVastaus(Button nappi, string vastaus)
        {
            var edellinen = avoinVastaus;
            if (edellinen.Vastaus != null)
            {
                edellinen.Vastaus.RemoveFromHierarchy();
                edellinen.Nappi.RemoveFromClassList("mk-auki");
                avoinVastaus = default;
                if (edellinen.Nappi == nappi) return;
            }
            var v = Rakenne.Teksti(vastaus ?? "", "mk-maakuntaKortti__vastaus");
            Kirjasimet.Aseta(v, Kirjasin.Luku);
            puluLohko.Insert(puluLohko.IndexOf(nappi) + 1, v);
            nappi.AddToClassList("mk-auki");
            avoinVastaus = (nappi, v);
        }
    }
}
