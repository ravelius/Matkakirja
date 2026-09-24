// MAAILMANRADION KUORI (Natiivi-UI): webin js/linssit/radiosoitin.js ja
// css/radio.css. Puinen putkiradio ruudun alalaidassa radiotilan ajan:
//
//   kotelo     puu (liukuväri #8f5f2f → #6b4423 42 % → #33200f, syyt 7/23/61 px,
//              valo- ja varjoläikät), 478 px enintään; puhelimessa alalaitaan
//              kiinni (pyöristys 12 12 0 0, alareunan turva-alue puun sisään),
//              leveällä ruudulla 14 14 9 9
//   näyttö     Pistenaytto (16 merkkiä × 2 riviä) tummalla lasilla #221204,
//              324 × 54 (≤ 700 px) tai 408 × 68; sammuksissa himmeä, virheessä
//              lasi #3a1408
//   lamppu     merkkivalo näytön oikealla: kromirengas, kupera lasi ja hehku;
//              punainen soidessa, meripihka virittäessä, tumma virheessä;
//              napautus = tauko/jatka (web asetaTauko; ks. alla)
//   asteikko   paperi, asteikkoviivat 8/40 px, punainen viisari keskellä ja
//              soivan kaupungin naapurit (4 per puoli; ≤ 700 px 3, ≤ 520 px 2);
//              nimen napautus = RadioLinssi.SoitaKaupunki. Viritys liikuttaa
//              nimirivia: siirtyma (liuku uudelle asemalle nykäyksittäin,
//              1,25 s), haku (pieni edestakainen liike 2,8 s) ja lukittuu
//              (0,32 s ylitys ja paluu). Vähennetty liike: ei liikettä.
//   mittari    VU-mittari (Linssisepän VuMittariNakyma, RadioLinssi.Mittari; BUILD 7, omistaja 24.9.2026):
//              webin v267 .radio-mittari 80 × 57 — leveällä kotelon vasemmassa laidassa keskiön rinnalla,
//              kapealla (web ≤ 765 px) keskiö omalla rivillään ja mittari sen alla vasemmalla. Asteikko
//              piirretään kerran, neula kääntyy muunnoksella (ei repaintia).
//   linkki     (hybridimalli) aseman nimi ja "Avaa aseman sivu" →
//              Application.OpenURL(RadioTila.Sivu), vain Vaihe Linkki
//
// RADIOUUDISTUS (build 12, Linssiseppä; suunnitelma docs/raportit/linssi-radiouudistus-suunnitelma-20260924.md
// luku 2, omistaja hyväksyi 24.9.): rivi 1 = VU | LCD | lamppu keskellä LCD:n oikealle jäävää tilaa, rivi 2 =
// viivain. Pinnat kuvaputken tekstuureista (Resources/Radio/, tyokalut/radiopinnat.py, ambientCG CC0) 9-slicenä:
// kotelo puuta, kehykset messinkiä, lasin päällyskuva LCD:n ja VU:n päällä, viivain paperia. Ilman kuvia
// (vanha käännös) kotelo ja paperi piirretään entisellä tavalla. Viivainta voi vetää: rahina asteikkoetäisyyden
// mukaan (RadioLinssi.Veto), irrotus lukitsee lähimpään asemaan.
//   iPad (> 700 pt)  kotelo 640, VU 118 × 84, LCD-lasi 424 × 84 (näyttö 408 × 68), lamppu ⌀ 30, viivain 42
//   iPhone           kotelo koko leveys, VU 76 × 56, LCD-lasi 240 × 58 (näyttö 224 × 42), lamppu ⌀ 20, viivain 36
//
// Linssiseppä omistaa soiton, viritysäänen ja luokkasäännön (mikä soi, mikä on
// linkki: RadioLinssi.ToimintoAsemalle). Kuori vain näyttää RadioTilan
// (TilaMuuttui) ja kutsuu SoitaKaupunki/Voimakkuus. Pistenäytön rivit tulevat
// RadioTila.Rivi1/Rivi2:sta.
//
// Asteikon naapurit: webissä kartan x/y-etäisyys; natiivissa RadioLinssi.Asteikko
// (kanavalliset kaupungit lännestä itään), jonka renkaalta otetaan soivan
// kaupungin molemmin puolin. Kun mitään ei soi, keskellä on viimeksi soinut,
// pelaajan kaupunki tai sitä pituusasteeltaan lähin.
//
// TAUKO: webin merkkivalo keskeyttää lähetyksen (audio.pause) ja näyttö jää
// ennalleen. RadioLinssissä ei ole taukoa, joten kuori mykistää
// (Voimakkuus = 0) ja palauttaa entisen voimakkuuden; uusi kaupunki nollaa tauon
// kuten webissä ("uuden kaupungin valitseminen on pyyntö kuulla se").
//
// PALLON NAPIT (RadioNapit, web radio.js pallonNapit / piirraPallonNapinSisus): radiotilassa kartalla
// on vain radion ▶-napit; pelin kaupunkimerkit ja nappula väistyvät (LinssiOhjain.RadioSovitin.OmatNapit).
// Nappi 44 × 44 (osuma-ala), rengas r 13 (1,4; soiva 2,4 punaisena), opasiteetti 0,85, kanavaton 0,34
// katkoviivalla 2 / 3,5 ilman kolmiota; soivalla hehku r 21 (0,16) ja ulkokeha r 17 (1,2, 0,62).
// Paikka joka ruutu LinssiOhjain.Ruutupiste (null = pallon takana → piilossa); napautus SoitaKaupunki.
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Radio;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class RadioNakyma
    {
        const float LiuunVahin = 10f, LiuunVaramatka = 0.5f;
        const float SiirtymaMs = 1250f, HakuMs = 2800f, LukkoMs = 320f;

        readonly UiKerros kerros;
        readonly VisualElement juuri, kotelo, lasi, asteikko, nauha, viisari, linkkiRivi;
        readonly Pistenaytto naytto;
        readonly RadioLamppu lamppu;
        readonly VisualElement keskio;
        readonly VuMittariNakyma vu;
        readonly Label linkkiNimi;
        readonly Button avaaSivu;
        readonly List<Label> paikat = new List<Label>();
        readonly List<string> naytetyt = new List<string>();

        LinssiOhjain.RadioSovitin sovitin;
        readonly RadioNapit napit;
        RadioLinssi linssi;
        bool nakyvissa, levea, pinnat;
        int perPuoli = 2;

        // Edellinen tila arvoina (RadioLinssi muuttaa Tila.Viritystä paikallaan).
        RadioVaihe vaihe = RadioVaihe.Hiljaa;
        ViritysVaihe viritys = ViritysVaihe.Ei;
        string kaupunki, sivu, keskus, viimeisinKeskus;
        float liukuMatka;

        bool tauolla;

        // Nimirivin liike (webin radio-liuku / radio-haku / radio-lukko).
        enum Liike { Ei, Liuku, Haku, Lukko }
        Liike liike;
        float liikeAlku, liuku, siirto, lukkoLahto, lukkoYli;
        readonly List<Vector2> kaari = new List<Vector2>();

        // Testitila (ui linssi radio …): keksitty tila ilman linssiä.
        bool testi;
        List<(string Id, string Nimi)> testiAsteikko;
        int testiVersio;

        public RadioNakyma(UiKerros kerros)
        {
            this.kerros = kerros;
            // Pallon napit kotelon alle samaan kerrokseen; pelin merkit piiloon radion ajaksi.
            LinssiOhjain.RadioSovitin.OmatNapit = true;
            napit = new RadioNapit(kerros.Juuri(LinssiUi.Kerros));
            kerros.JokaRuutu += napit.Paivita;
            juuri = Rakenne.El("mk-radio", kerros.Juuri(LinssiUi.RadioKerros), PickingMode.Ignore);
            juuri.style.display = DisplayStyle.None;

            kotelo = Rakenne.El("mk-radio__kotelo", juuri);
            pinnat = RadioPinnat.Kotelo(kotelo);
            if (pinnat) juuri.AddToClassList("mk-radio--pinnat"); else Rakenne.Tausta(kotelo, Puu);
            var varjo = Rakenne.El("mk-radio__varjo", kotelo, PickingMode.Ignore);
            Rakenne.Tausta(varjo, Kuviot.Pysty("radio-varjo", new Color(0, 0, 0, 0), new Color(0.05f, 0.03f, 0.01f, Pistenaytto.Peitto(0.32f, Color.black, new Color(0.5f, 0.45f, 0.35f)))));
            keskio = Rakenne.El("mk-radio__keskio", kotelo, PickingMode.Ignore);
            // Rivi 1: VU | LCD | lamppu (radiouudistus: sama rivi kaikilla leveyksillä).
            var rivi = Rakenne.El("mk-radio__nayttorivi", keskio, PickingMode.Ignore);
            var vuKehys = Rakenne.El("mk-radio__kehys mk-radio__vukehys", rivi, PickingMode.Ignore);
            RadioPinnat.Kehys(vuKehys);
            vu = VuMittariNakyma.Luo(() => linssi?.Mittari);
            vu.AddToClassList("mk-radio__vu");
            vu.style.width = StyleKeyword.Null;
            vu.style.height = StyleKeyword.Null;
            vu.KaytaLevya(RadioPinnat.Kuva("radio-vu-levy"));
            vuKehys.Add(vu);
            RadioPinnat.Lasi(Rakenne.El("mk-radio__lasipinta", vuKehys, PickingMode.Ignore));

            // Näyttö messinkikehyksessä ja merkkivalo LCD:n oikealle jäävän tilan keskellä.
            var lcdKehys = Rakenne.El("mk-radio__kehys mk-radio__lcdkehys", rivi, PickingMode.Ignore);
            RadioPinnat.Kehys(lcdKehys);
            lasi = Rakenne.El("mk-radio__naytto", lcdKehys, PickingMode.Ignore);
            var lasiVari = new Color32(0x22, 0x12, 0x04, 255);
            Rakenne.Tausta(lasi, Kuviot.Pysty("radio-lasi",
                new Color(1, 1, 1, Pistenaytto.Peitto(0.10f, Color.white, lasiVari)),
                new Color(0, 0, 0, Pistenaytto.Peitto(0.22f, Color.black, new Color32(0x6e, 0x5a, 0x40, 255)))));
            naytto = new Pistenaytto(16, 2) { LiikeSallittu = () => !LinssiUi.VahennettyLiike() };
            naytto.AddToClassList("mk-radio__pisteet");
            lasi.Add(naytto);
            Rakenne.El("mk-radio__lasikehys", lasi, PickingMode.Ignore);
            RadioPinnat.Lasi(Rakenne.El("mk-radio__lasipinta", lcdKehys, PickingMode.Ignore));
            var lamppualue = Rakenne.El("mk-radio__lamppualue", rivi, PickingMode.Ignore);
            lamppu = new RadioLamppu(PainaLamppua);
            lamppu.AddToClassList("mk-radio__lamppu");
            lamppu.tooltip = "Keskeytä lähetys";
            lamppualue.Add(lamppu);

            // Asteikko: paperi, viivat (Asteikkoviivat), nimirivi ja viisari.
            var asteikkoKehys = Rakenne.El("mk-radio__kehys mk-radio__asteikkokehys", keskio, PickingMode.Ignore);
            RadioPinnat.Kehys(asteikkoKehys);
            asteikko = new Asteikkoviivat();
            asteikko.AddToClassList("mk-radio__asteikko");
            // Viivaimen veto (radiouudistus): asteikko ottaa osoittimen, nimet napautuksen.
            asteikko.pickingMode = PickingMode.Position;
            if (!RadioPinnat.Paperi(asteikko)) Rakenne.Tausta(asteikko, Paperi);
            asteikkoKehys.Add(asteikko);
            KytkeVeto();
            nauha = Rakenne.El("mk-radio__nauha", asteikko, PickingMode.Ignore);
            viisari = Rakenne.El("mk-radio__viisari", asteikko, PickingMode.Ignore);
            Rakenne.El("mk-radio__viisari-punainen", viisari, PickingMode.Ignore);

            // Linkkiasema (hybridimalli): nimi ja "Avaa aseman sivu".
            linkkiRivi = Rakenne.El("mk-radio__linkki", keskio, PickingMode.Ignore);
            linkkiNimi = Rakenne.Teksti("", "mk-radio__linkkinimi", linkkiRivi);
            Kirjasimet.Aseta(linkkiNimi, Kirjasin.LukuKursiivi);
            avaaSivu = Rakenne.Nappi("Avaa aseman sivu", "mk-nappi--kulta mk-radio__sivu", AvaaSivu, linkkiRivi);
            Rakenne.Tausta(avaaSivu, Kuviot.Kulta);
            Kirjasimet.Aseta(avaaSivu, Kirjasin.KoneLihava);
            avaaSivu.tooltip = "Avaa aseman oma sivu selaimessa";

            juuri.RegisterCallback<GeometryChangedEvent>(e => Mitoita(e.newRect.width));
            kerros.TurvaMuuttui += Asettele;
            Asettele();
            RakennaPaikat();
            juuri.schedule.Execute(Tikki).Every(16);
        }

        // --- kytkentä -------------------------------------------------------------------

        /// <summary>Linssi vaihtui (LinssiUi.Vaihtui): radio näkyviin tai pois.</summary>
        public void Kytke(ILinssi l)
        {
            var s = l as LinssiOhjain.RadioSovitin;
            if (s == null)
            {
                // Käynnistyksen Kytke(null) ei sulje testinäkymää; oikea linssi sulkee.
                if (testi && l == null) return;
                LopetaTesti();
                sovitin = null;
                Sido(null);
                Nayta(false);
                return;
            }
            LopetaTesti();
            sovitin = s;
            Sido(s.Linssi);
            Nayta(true);
        }

        void Sido(RadioLinssi l)
        {
            if (ReferenceEquals(l, linssi)) return;
            if (linssi != null) linssi.TilaMuuttui -= TilaMuuttui;
            linssi = l;
            tauolla = false;
            lamppu.Tauko = false;
            keskus = null;
            vaihe = RadioVaihe.Hiljaa;
            viritys = ViritysVaihe.Ei;
            kaupunki = null;
            napit.Sido(l);
            if (l == null) return;
            l.TilaMuuttui += TilaMuuttui;
            TilaMuuttui(l.Tila);
        }

        void Nayta(bool auki)
        {
            if (auki == nakyvissa) return;
            nakyvissa = auki;
            Rakenne.Nayta(juuri, auki, 180);
            if (!auki) { naytto.Pysayta(); PysaytaLiike(); }
        }

        void Asettele()
        {
            float ala = kerros.Reunat(LinssiUi.Kerros).w;
            // Puhelimessa kotelo on alalaidassa kiinni ja puu jatkuu kotipalkin alle;
            // leveällä ruudulla kotelo kelluu turva-alueen yläpuolella (web --turva-ala).
            juuri.style.paddingBottom = levea ? ala : 0;
            kotelo.style.paddingBottom = pinnat ? (levea ? 14f : 12f + ala) : levea ? 8f : 7.2f + ala;
        }

        void Mitoita(float w)
        {
            if (float.IsNaN(w) || w <= 0) return;
            bool uusiLevea = w > 700;
            int uusiPuoli = w > 700 ? 4 : w > 520 ? 3 : 2;
            if (uusiLevea != levea)
            {
                levea = uusiLevea;
                juuri.EnableInClassList("mk-radio--levea", levea);
                lamppu.Halkaisija = levea ? 30f : 20f;
                Asettele();
            }
            if (uusiPuoli != perPuoli)
            {
                perPuoli = uusiPuoli;
                RakennaPaikat();
                keskus = null;
                PaivitaAsteikko(false);
            }
        }

        // --- tila -----------------------------------------------------------------------

        void TilaMuuttui(RadioTila t)
        {
            if (t == null) return;
            bool uusiViritys = t.Vaihe == RadioVaihe.Viritys && t.Viritys == ViritysVaihe.Siirtyma &&
                               (vaihe != RadioVaihe.Viritys || viritys != ViritysVaihe.Siirtyma || t.KaupunkiId != kaupunki);
            // Uusi kaupunki on pyyntö kuulla se; hiljaa-tila vapauttaa mykistyksen.
            // Tauon tila tulee linssiltä (RadioLinssi.Tauko; uusi asema tai STOP purkaa sen).
            if (linssi != null) { tauolla = t.Tauolla; lamppu.Tauko = tauolla; }
            else if (tauolla && (uusiViritys || t.Vaihe == RadioVaihe.Hiljaa)) AsetaTauko(false);

            bool vaiheVaihtui = t.Vaihe != vaihe;
            var edellinenViritys = viritys;
            vaihe = t.Vaihe;
            viritys = t.Vaihe == RadioVaihe.Viritys ? t.Viritys : ViritysVaihe.Ei;
            kaupunki = t.KaupunkiId;
            sivu = t.Sivu;

            foreach (RadioVaihe v in System.Enum.GetValues(typeof(RadioVaihe)))
                juuri.EnableInClassList("mk-radio--" + v.ToString().ToLowerInvariant(), v == vaihe);
            naytto.Himmea = vaihe == RadioVaihe.Hiljaa;
            naytto.Lasi = vaihe == RadioVaihe.Virhe ? new Color32(0x3a, 0x14, 0x08, 255) : new Color32(0x22, 0x12, 0x04, 255);
            naytto.NaytaTeksti(t.Rivi1 ?? "", t.Rivi2 ?? "");
            lamppu.Vaihe = vaihe;
            lamppu.tooltip = tauolla ? "Jatka lähetystä" : "Keskeytä lähetys";

            // Linkkiasema: nimi kokonaan ja sivun nappi.
            bool linkki = vaihe == RadioVaihe.Linkki;
            linkkiRivi.style.display = linkki ? DisplayStyle.Flex : DisplayStyle.None;
            if (linkki)
            {
                string paikka = string.Join(" · ", new[] { t.KaupunkiNimi, t.Maa }.Where(s => !string.IsNullOrEmpty(s)));
                linkkiNimi.text = string.IsNullOrEmpty(t.Nimi) ? paikka : paikka.Length > 0 ? t.Nimi + " — " + paikka : t.Nimi;
                avaaSivu.style.display = string.IsNullOrEmpty(sivu) ? DisplayStyle.None : DisplayStyle.Flex;
            }

            PaivitaAsteikko(uusiViritys);

            // Nimirivin liike virityksen vaiheen mukaan.
            if (vaihe != RadioVaihe.Viritys) { if (vaiheVaihtui || liike != Liike.Ei) PysaytaLiike(); return; }
            if (uusiViritys) AloitaLiuku();
            else if (viritys == ViritysVaihe.Haku && edellinenViritys != ViritysVaihe.Haku) Aloita(Liike.Haku);
            else if (viritys == ViritysVaihe.Lukittuu && edellinenViritys != ViritysVaihe.Lukittuu) AloitaLukko();
        }

        // --- asteikko -------------------------------------------------------------------

        IReadOnlyList<string> AsteikonIdt()
        {
            if (testi && testiAsteikko != null)
            {
                var l = new List<string>(testiAsteikko.Count);
                foreach (var x in testiAsteikko) l.Add(x.Id);
                return l;
            }
            return linssi?.Asteikko ?? (IReadOnlyList<string>)System.Array.Empty<string>();
        }

        string Nimi(string id)
        {
            if (id == null) return "";
            if (testi && testiAsteikko != null)
                foreach (var x in testiAsteikko) if (x.Id == id) return x.Nimi;
            return sovitin?.Aineisto?.Kaupunki(id)?.Nimi ?? id;
        }

        string LaskeKeskus(IReadOnlyList<string> idt)
        {
            if (idt.Count == 0) return null;
            if (kaupunki != null && Sisaltaa(idt, kaupunki)) return kaupunki;
            if (viimeisinKeskus != null && Sisaltaa(idt, viimeisinKeskus)) return viimeisinKeskus;
            string oma = testi ? "helsinki" : linssi?.Sijainti?.Invoke();
            if (oma != null && Sisaltaa(idt, oma)) return oma;
            // Pelaajan kaupunki ilman kanavaa: pituusasteeltaan lähin kanavakaupunki.
            var a = sovitin?.Aineisto;
            var k = oma == null ? null : a?.Kaupunki(oma);
            if (k != null)
            {
                string paras = null;
                double parasEro = double.MaxValue;
                foreach (var id in idt)
                {
                    var m = a.Kaupunki(id);
                    if (m == null) continue;
                    double ero = System.Math.Abs(((m.Lon - k.Lon) % 360 + 540) % 360 - 180);
                    ero += System.Math.Abs(m.Lat - k.Lat) * 0.5;
                    if (ero < parasEro) { parasEro = ero; paras = id; }
                }
                if (paras != null) return paras;
            }
            return idt[idt.Count / 2];
        }

        static bool Sisaltaa(IReadOnlyList<string> l, string id)
        {
            for (int i = 0; i < l.Count; i++) if (l[i] == id) return true;
            return false;
        }

        void RakennaPaikat()
        {
            nauha.Clear();
            paikat.Clear();
            naytetyt.Clear();
            for (int i = 0; i < perPuoli * 2 + 1; i++)
            {
                int sija = System.Math.Abs(i - perPuoli);
                var l = new Label("") { pickingMode = PickingMode.Position };
                Rakenne.Luokat(l, "mk-radio__kaupunki" + (sija == 0 ? " mk-radio__kaupunki--keski" : sija >= 3 ? " mk-radio__kaupunki--kauka" : ""));
                Kirjasimet.Aseta(l, sija == 0 ? Kirjasin.KoneLihava : Kirjasin.Kone);
                int j = i;
                l.AddManipulator(new Clickable(() => ValitsePaikka(j)));
                nauha.Add(l);
                paikat.Add(l);
                naytetyt.Add(null);
            }
        }

        void PaivitaAsteikko(bool mitaLiuku)
        {
            var idt = AsteikonIdt();
            string uusi = LaskeKeskus(idt);
            if (uusi != null) viimeisinKeskus = uusi;
            viisari.style.display = uusi == null ? DisplayStyle.None : DisplayStyle.Flex;
            if (uusi == keskus && naytetyt.Count == paikat.Count && !mitaLiuku) return;

            // Liuun matka: uuden aseman vanha paikka nauhalla (web laskeLiuku).
            float leveys = nauha.layout.width;
            float paikka = paikat.Count > 0 && !float.IsNaN(leveys) && leveys > 0 ? leveys / paikat.Count : 0;
            int vanhaSija = uusi == null ? -1 : naytetyt.IndexOf(uusi);
            if (vanhaSija >= 0 && keskus != null && paikka > 0)
            {
                float matka = (vanhaSija - perPuoli) * paikka;
                liukuMatka = Mathf.Abs(matka) >= LiuunVahin ? matka : matka < 0 ? -LiuunVahin : LiuunVahin;
            }
            else
            {
                float vara = Mathf.Max(LiuunVahin, (float.IsNaN(asteikko.layout.width) ? 0 : asteikko.layout.width) * LiuunVaramatka);
                int i0 = keskus == null ? -1 : IndexOf(idt, keskus), i1 = uusi == null ? -1 : IndexOf(idt, uusi);
                if (i0 < 0 || i1 < 0) liukuMatka = vara;
                else
                {
                    int n = idt.Count, d = ((i1 - i0) % n + n) % n;
                    if (d > n / 2) d -= n;
                    liukuMatka = d < 0 ? -vara : vara;
                }
            }
            // Vedosta irrotettu uusi asema: nauha on jo sormen viemänä melkein perillä, joten liuku on vain jäännös.
            if (vetoJaannos is float j && vanhaSija >= 0 && paikka > 0) liukuMatka = (vanhaSija - perPuoli) * paikka + j;
            vetoJaannos = null;
            keskus = uusi;

            // Naapurit renkaalta; lyhyellä asteikolla ei toistoja (tyhjät paikat reunoille).
            int nIdt = idt.Count, ic = uusi == null ? -1 : IndexOf(idt, uusi);
            int vasen = ic < 0 ? 0 : System.Math.Min(perPuoli, (nIdt - 1) / 2);
            int oikea = ic < 0 ? 0 : System.Math.Min(perPuoli, nIdt - 1 - vasen);
            for (int i = 0; i < paikat.Count; i++)
            {
                int k = i - perPuoli;
                string id = ic < 0 || k < -vasen || k > oikea ? null : idt[((ic + k) % nIdt + nIdt) % nIdt];
                naytetyt[i] = id;
                paikat[i].text = id == null ? "" : Nimi(id).ToUpperInvariant();
                paikat[i].tooltip = id == null ? null : "Viritä kanava: " + Nimi(id);
                paikat[i].pickingMode = id == null ? PickingMode.Ignore : PickingMode.Position;
            }
        }

        static int IndexOf(IReadOnlyList<string> l, string id)
        {
            for (int i = 0; i < l.Count; i++) if (l[i] == id) return i;
            return -1;
        }

        void ValitsePaikka(int i)
        {
            if (i < 0 || i >= naytetyt.Count || naytetyt[i] == null) return;
            string id = naytetyt[i];
            if (testi) { Simuloi(id); return; }
            linssi?.SoitaKaupunki(id);
        }

        // --- viivaimen veto (radiouudistus, suunnitelma luku 7) ---------------------------

        const float VedonKynnys = 6f;
        bool vetoAlkoi, painettu;
        float vetoX0, vetoDx;
        int vetoOsoitin = -1;
        float? vetoJaannos;

        void KytkeVeto()
        {
            asteikko.RegisterCallback<PointerDownEvent>(e =>
            {
                if (linssi == null || !nakyvissa) return;
                painettu = true;
                vetoAlkoi = false;
                vetoX0 = e.position.x;
                vetoDx = 0;
                vetoOsoitin = e.pointerId;
            }, TrickleDown.TrickleDown);
            asteikko.RegisterCallback<PointerMoveEvent>(e =>
            {
                if (!painettu || e.pointerId != vetoOsoitin) return;
                vetoDx = e.position.x - vetoX0;
                if (!vetoAlkoi && Mathf.Abs(vetoDx) >= VedonKynnys)
                {
                    vetoAlkoi = true;
                    asteikko.CapturePointer(vetoOsoitin);
                    liike = Liike.Ei;
                    linssi?.VetoAlkaa();
                }
                if (!vetoAlkoi) return;
                AsetaSiirto(vetoDx);
                float paikka = Paikka;
                if (paikka > 0)
                {
                    float u = vetoDx / paikka;
                    linssi?.Veto(Mathf.Abs(u - Mathf.Round(u)));
                }
                e.StopPropagation();
            }, TrickleDown.TrickleDown);
            asteikko.RegisterCallback<PointerUpEvent>(e => LopetaVeto(e.pointerId), TrickleDown.TrickleDown);
            asteikko.RegisterCallback<PointerCaptureOutEvent>(_ => LopetaVeto(vetoOsoitin));
        }

        float Paikka
        {
            get
            {
                float w = nauha.layout.width;
                return paikat.Count > 0 && !float.IsNaN(w) && w > 0 ? w / paikat.Count : 0;
            }
        }

        void LopetaVeto(int osoitin)
        {
            if (!painettu || osoitin != vetoOsoitin) return;
            painettu = false;
            if (asteikko.HasPointerCapture(osoitin)) asteikko.ReleasePointer(osoitin);
            if (!vetoAlkoi) return;   // lyhyt kosketus: nimen Clickable hoitaa napautuksen
            vetoAlkoi = false;
            float paikka = Paikka;
            int askel = paikka > 0 ? Mathf.RoundToInt(vetoDx / paikka) : 0;
            int sija = Mathf.Clamp(perPuoli - askel, 0, naytetyt.Count - 1);
            string lahin = naytetyt.Count > 0 ? naytetyt[sija] : null;
            if (lahin == null || lahin == kaupunki || sija == perPuoli)
            {
                // Sama asema: nauha palaa lukituksen liikkeellä, lähetys nousee rampilla (RadioLinssi.VetoLoppuu).
                linssi?.VetoLoppuu(kaupunki);
                AloitaLukko();
                return;
            }
            vetoJaannos = vetoDx - (perPuoli - sija) * paikka;
            linssi?.VetoLoppuu(lahin);
        }

        // --- merkkivalo ja linkki -------------------------------------------------------

        void PainaLamppua()
        {
            if (vaihe == RadioVaihe.Soi || vaihe == RadioVaihe.Viritys) AsetaTauko(!tauolla);
            else if (tauolla) AsetaTauko(false);
        }

        void AsetaTauko(bool paalle)
        {
            if (paalle == tauolla) return;
            tauolla = paalle;
            // Oikea tauko (Linssiseppä 943be95): lähetys ja viritysääni pysähtyvät, tila säilyy.
            linssi?.Tauko(paalle);
            lamppu.Tauko = paalle;
            lamppu.tooltip = paalle ? "Jatka lähetystä" : "Keskeytä lähetys";
        }

        void AvaaSivu()
        {
            if (string.IsNullOrEmpty(sivu)) return;
            if (!sivu.StartsWith("https://") && !sivu.StartsWith("http://")) return;
            Application.OpenURL(sivu);
        }

        // --- nimirivin liike ------------------------------------------------------------

        bool LiikeSallittu => !LinssiUi.VahennettyLiike();
        static float Nyt => Time.realtimeSinceStartup * 1000f;

        void Aloita(Liike l)
        {
            if (!LiikeSallittu) { PysaytaLiike(); return; }
            liike = l;
            liikeAlku = Nyt;
        }

        void AloitaLiuku()
        {
            liuku = Mathf.Round(liukuMatka);
            kaari.Clear();
            kaari.AddRange(Nykaisyt());
            Aloita(Liike.Liuku);
            AsetaSiirto(liike == Liike.Liuku ? liuku : 0);
        }

        void AloitaLukko()
        {
            lukkoLahto = Mathf.Round(siirto * 10f) / 10f;
            float koko = Random.Range(0.8f, 1.8f);
            lukkoYli = Mathf.Round((lukkoLahto > 0 ? -1 : 1) * koko * 10f) / 10f;
            Aloita(Liike.Lukko);
        }

        void PysaytaLiike()
        {
            liike = Liike.Ei;
            AsetaSiirto(0);
        }

        void AsetaSiirto(float x)
        {
            siirto = x;
            nauha.style.translate = new Translate(x, 0);
        }

        void Tikki()
        {
            if (sovitin != null && !ReferenceEquals(sovitin.Linssi, linssi)) Sido(sovitin.Linssi);
            if (!nakyvissa || liike == Liike.Ei) return;
            if (!LiikeSallittu) { PysaytaLiike(); return; }
            float t = Nyt - liikeAlku;
            switch (liike)
            {
                case Liike.Liuku:
                    AsetaSiirto(liuku * (1f - Kaari(Mathf.Clamp01(t / SiirtymaMs))));
                    break;
                case Liike.Haku:
                    AsetaSiirto(Haku((t % HakuMs) / HakuMs));
                    break;
                case Liike.Lukko:
                {
                    float u = Mathf.Clamp01(t / LukkoMs);
                    float x = u < 0.72f
                        ? Mathf.Lerp(lukkoLahto, lukkoYli, Hidastuva(u / 0.72f))
                        : Mathf.Lerp(lukkoYli, 0, Hidastuva((u - 0.72f) / 0.28f));
                    AsetaSiirto(x);
                    if (u >= 1) liike = Liike.Ei;
                    break;
                }
            }
        }

        static float Hidastuva(float x) => 1f - Mathf.Pow(1f - Mathf.Clamp01(x), 3f);

        /// <summary>@keyframes radio-haku (ease-in-out kehysten välillä).</summary>
        static readonly Vector2[] HakuKehykset =
        {
            new Vector2(0f, 0f), new Vector2(0.18f, -2f), new Vector2(0.36f, 0.5f), new Vector2(0.55f, 1.6f),
            new Vector2(0.72f, -0.3f), new Vector2(0.88f, -1.3f), new Vector2(1f, 0f),
        };

        static float Haku(float u)
        {
            for (int i = 1; i < HakuKehykset.Length; i++)
            {
                var a = HakuKehykset[i - 1];
                var b = HakuKehykset[i];
                if (u <= b.x) return Mathf.Lerp(a.y, b.y, Mathf.SmoothStep(0, 1, (u - a.x) / (b.x - a.x)));
            }
            return 0;
        }

        /// <summary>Liuun kaari: nykäysten paloittain lineaarinen käyrä (web nykaisyKaari).</summary>
        float Kaari(float u)
        {
            if (kaari.Count < 2) return Hidastuva(u);
            for (int i = 1; i < kaari.Count; i++)
            {
                var a = kaari[i - 1];
                var b = kaari[i];
                if (u <= b.x) return b.x - a.x <= 1e-5f ? b.y : Mathf.Lerp(a.y, b.y, (u - a.x) / (b.x - a.x));
            }
            return 1;
        }

        /// <summary>
        /// Web arvoNykaisyt (NYKAISYN_RAJAT): 4–6 nykäystä, jokainen ensin tarttuu (seisoo)
        /// ja sitten hyppää; viimeinen ylittää kohteen 2–5 % ja palaa. Pisteet (aika, etenemä).
        /// </summary>
        static List<Vector2> Nykaisyt()
        {
            float Valilta(float a, float b) => a + Random.value * (b - a);
            int otteita = Random.Range(4, 7);
            float ylitys = Valilta(0.02f, 0.05f), paluu = Valilta(0.09f, 0.16f);
            var painot = new float[otteita];
            float summa = 0;
            for (int i = 0; i < otteita; i++) { painot[i] = (1 + i * 0.55f) * Valilta(0.75f, 1.3f); summa += painot[i]; }
            float liikeAika = 1 - paluu, aika = 0, edellinen = 0;
            var pisteet = new List<Vector2> { Vector2.zero };
            for (int i = 0; i < otteita; i++)
            {
                bool viimeinen = i == otteita - 1;
                float kesto = painot[i] / summa * liikeAika;
                float pohja = 1 - Mathf.Pow(1 - (i + 1f) / otteita, 2.2f);
                float kohde = viimeinen ? 1 + ylitys : Mathf.Min(0.985f, Mathf.Max(edellinen + 0.02f, pohja + Valilta(-0.05f, 0.05f)));
                float seisonta = kesto * Valilta(0.2f, 0.5f);
                aika += seisonta;
                pisteet.Add(new Vector2(aika, edellinen));
                aika += kesto - seisonta;
                pisteet.Add(new Vector2(aika, kohde));
                edellinen = kohde;
            }
            pisteet.Add(new Vector2(liikeAika + paluu * 0.25f, 1 + ylitys));
            pisteet.Add(new Vector2(1, 1));
            return pisteet;
        }

        // --- testitila (ui linssi radio …) ----------------------------------------------

        /// <summary>Kuori keksityllä tilalla ilman linssiä: hiljaa|viritys|soi|linkki|virhe|pois.</summary>
        public string Testaa(string mika)
        {
            mika = string.IsNullOrEmpty(mika) ? "soi" : mika.ToLowerInvariant();
            if (mika == "pois") { TestiPois(); return null; }
            if (LinssiUi.Rekisteri?.Auki is LinssiOhjain.RadioSovitin) return "radio on auki: testitila ei ohita oikeaa linssiä";
            testi = true;
            sovitin = null;
            Sido(null);
            testiAsteikko = new List<(string, string)>
            {
                ("lissabon", "Lissabon"), ("madrid", "Madrid"), ("pariisi", "Pariisi"), ("amsterdam", "Amsterdam"),
                ("rooma", "Rooma"), ("berliini", "Berliini"), ("tukholma", "Tukholma"), ("varsova", "Varsova"),
                ("ateena", "Ateena"), ("helsinki", "Helsinki"), ("istanbul", "Istanbul"), ("kiova", "Kiova"), ("kairo", "Kairo"),
            };
            testiVersio++;
            Nayta(true);
            switch (mika)
            {
                case "hiljaa":
                    TilaMuuttui(new RadioTila { Vaihe = RadioVaihe.Hiljaa, Rivi1 = "RADIO POIS", Rivi2 = "VALITSE KAUPUNKI" });
                    return null;
                case "viritys":
                    Simuloi("pariisi", false);
                    return null;
                case "linkki":
                    TilaMuuttui(TestiTila(RadioVaihe.Linkki, "rooma"));
                    return null;
                case "virhe":
                    TilaMuuttui(TestiTila(RadioVaihe.Virhe, "madrid"));
                    return null;
                case "soi":
                    TilaMuuttui(TestiTila(RadioVaihe.Soi, "berliini"));
                    return null;
                default:
                    TestiPois();
                    return "ui linssi radio hiljaa|viritys|soi|linkki|virhe|pois";
            }
        }

        public void TestiPois()
        {
            if (!testi) return;
            LopetaTesti();
            Nayta(false);
        }

        void LopetaTesti()
        {
            if (!testi) return;
            testi = false;
            testiVersio++;
            testiAsteikko = null;
            tauolla = false;
            lamppu.Tauko = false;
            keskus = null;
            kaupunki = null;
            vaihe = RadioVaihe.Hiljaa;
            viritys = ViritysVaihe.Ei;
        }

        /// <summary>Webin virityssarja keksityllä asemalla: siirtymä, haku, lukitus ja soitto.</summary>
        void Simuloi(string id, bool loppuun = true)
        {
            int versio = ++testiVersio;
            void Myohemmin(long ms, System.Action a) =>
                juuri.schedule.Execute(() => { if (testi && versio == testiVersio) a(); }).StartingIn(ms);
            var t = TestiTila(RadioVaihe.Viritys, id);
            t.Viritys = ViritysVaihe.Siirtyma;
            TilaMuuttui(t);
            Myohemmin((long)SiirtymaMs, () => { t.Viritys = ViritysVaihe.Haku; TilaMuuttui(t); });
            if (!loppuun) return;
            Myohemmin((long)RadioLinssi.LukitusAikaisintaanMs, () => { t.Viritys = ViritysVaihe.Lukittuu; TilaMuuttui(t); });
            Myohemmin((long)RadioLinssi.VahimmaisaikaMs, () => TilaMuuttui(TestiTila(RadioVaihe.Soi, id)));
        }

        RadioTila TestiTila(RadioVaihe v, string id)
        {
            string nimi, maa, kaupunkiNimi = Nimi(id), sivuOsoite = null, viesti = null;
            switch (id)
            {
                case "berliini": nimi = "Deutschlandfunk Kultur"; maa = "Saksa"; break;
                case "rooma": nimi = "Rai Radio 3"; maa = "Italia"; sivuOsoite = "https://www.raiplaysound.it/radio3"; break;
                case "madrid": nimi = "Radio Nacional"; maa = "Espanja"; viesti = "Asema ei vastaa"; break;
                case "pariisi": nimi = "France Inter"; maa = "Ranska"; break;
                default: nimi = "Radio " + kaupunkiNimi; maa = ""; break;
            }
            string naytto = nimi.ToUpperInvariant();
            return new RadioTila
            {
                Vaihe = v, AsemaId = id, Nimi = nimi, Naytto = nimi, Maa = maa, KaupunkiId = id, KaupunkiNimi = kaupunkiNimi,
                Viesti = v == RadioVaihe.Virhe ? viesti : null, Sivu = v == RadioVaihe.Linkki ? sivuOsoite : null,
                Rivi1 = v switch { RadioVaihe.Viritys => "VIRITTÄÄ...", RadioVaihe.Virhe => "EI KUULU", _ => naytto },
                Rivi2 = v == RadioVaihe.Soi || v == RadioVaihe.Linkki ? kaupunkiNimi.ToUpperInvariant() : v == RadioVaihe.Virhe ? (viesti ?? "").ToUpperInvariant() : "",
            };
        }

        // --- tekstuurit -----------------------------------------------------------------

        static Texture2D puu, paperi;

        static Color Paalle(Color alla, Color c) => Color.Lerp(alla, new Color(c.r, c.g, c.b, 1), c.a);

        /// <summary>radial-gradient(rx ry at cx cy, c, transparent loppu): peitto pisteessä (u, v).</summary>
        static float Laikka(float u, float v, float cx, float cy, float rx, float ry, float loppu)
        {
            float dx = (u - cx) / rx, dy = (v - cy) / ry;
            float r = Mathf.Sqrt(dx * dx + dy * dy);
            return Mathf.Clamp01(1f - r / loppu);
        }

        static Texture2D Uusi(string nimi, int w, int h) => new Texture2D(w, h, TextureFormat.RGBA32, false)
        {
            name = "Matkakirja " + nimi,
            wrapMode = TextureWrapMode.Clamp,
            filterMode = FilterMode.Bilinear,
            hideFlags = HideFlags.DontSave,
        };

        /// <summary>.radio-kotelo: puun liukuväri, syyt ja valo-/varjoläikät.</summary>
        static Texture2D Puu
        {
            get
            {
                if (puu != null) return puu;
                const int W = 480, H = 140;
                puu = Uusi("radio-puu", W, H);
                var px = new Color[W * H];
                Color v1 = Kuviot.Vari("#8f5f2f"), v2 = Kuviot.Vari("#6b4423"), v3 = Kuviot.Vari("#33200f");
                var syyKohina = new float[W];
                var sat = new System.Random(1873);
                for (int x = 0; x < W; x++) syyKohina[x] = (float)sat.NextDouble();
                for (int y = 0; y < H; y++)
                for (int x = 0; x < W; x++)
                {
                    float u = (x + 0.5f) / W, v = 1f - (y + 0.5f) / H; // v = 0 ylhäällä
                    var c = v < 0.42f ? Color.Lerp(v1, v2, v / 0.42f) : Color.Lerp(v2, v3, (v - 0.42f) / 0.58f);
                    // Syyt (repeating-linear-gradient 90,6° / 89,4° / 90°), hieman vinossa.
                    int x1 = (int)(x + v * H * 0.0105f), x2 = (int)(x - v * H * 0.0105f);
                    int m7 = ((x1 % 7) + 7) % 7, m23 = ((x2 % 23) + 23) % 23, m61 = x % 61;
                    if (m7 == 0) c = Paalle(c, new Color(0, 0, 0, 0.07f));
                    else if (m7 == 1) c = Paalle(c, new Color(1f, 0.94f, 0.84f, 0.045f));
                    if (m23 < 2) c = Paalle(c, new Color(0, 0, 0, 0.06f));
                    if (m61 < 3) c = Paalle(c, new Color(0.094f, 0.047f, 0.016f, 0.09f));
                    c = Paalle(c, new Color(0, 0, 0, syyKohina[x1 < 0 ? 0 : x1 % W] * 0.035f));
                    // Valo- ja varjoläikät (.radio-kotelo background-image).
                    c = Paalle(c, new Color(1f, 0.933f, 0.816f, 0.14f * Laikka(u, v, 0.04f, 0.06f, 0.21f, 0.88f, 0.74f)));
                    c = Paalle(c, new Color(1f, 0.94f, 0.84f, 0.10f * Laikka(u, v, 0.98f, 0.28f, 0.11f, 1.30f, 0.76f)));
                    c = Paalle(c, new Color(1f, 0.925f, 0.8f, 0.08f * Laikka(u, v, 0.43f, -0.10f, 0.27f, 0.44f, 0.72f)));
                    c = Paalle(c, new Color(0.086f, 0.043f, 0.012f, 0.20f * Laikka(u, v, 0.69f, 1.08f, 0.38f, 0.50f, 0.74f)));
                    c = Paalle(c, new Color(0.086f, 0.043f, 0.012f, 0.16f * Laikka(u, v, 0.14f, 1.04f, 0.17f, 0.40f, 0.76f)));
                    px[y * W + x] = c;
                }
                puu.SetPixels(px);
                puu.Apply(false, true);
                return puu;
            }
        }

        /// <summary>.radio-asteikko: kellertävä paperi, lamppujen valo ylhäällä, varjo nurkissa.</summary>
        static Texture2D Paperi
        {
            get
            {
                if (paperi != null) return paperi;
                const int W = 256, H = 40;
                paperi = Uusi("radio-paperi", W, H);
                var px = new Color[W * H];
                Color p1 = Kuviot.Vari("#e8d5ae"), p2 = Kuviot.Vari("#e0cba1"), p3 = Kuviot.Vari("#cfb388");
                for (int y = 0; y < H; y++)
                for (int x = 0; x < W; x++)
                {
                    float u = (x + 0.5f) / W, v = 1f - (y + 0.5f) / H;
                    var c = v < 0.52f ? Color.Lerp(p1, p2, v / 0.52f) : Color.Lerp(p2, p3, (v - 0.52f) / 0.48f);
                    c = Paalle(c, new Color(1f, 0.957f, 0.816f, 0.82f * Laikka(u, v, 0.30f, 0f, 0.40f, 1.08f, 0.82f) * 0.6f));
                    c = Paalle(c, new Color(1f, 0.937f, 0.753f, 0.56f * Laikka(u, v, 0.66f, 0.04f, 0.26f, 0.78f, 0.78f) * 0.6f));
                    c = Paalle(c, new Color(1f, 0.894f, 0.651f, 0.24f * Laikka(u, v, 0.11f, 0.62f, 0.16f, 0.50f, 0.82f)));
                    c = Paalle(c, new Color(1f, 0.953f, 0.8f, 0.30f * Laikka(u, v, 0.88f, 0.26f, 0.11f, 0.38f, 0.84f)));
                    c = Paalle(c, new Color(0.29f, 0.18f, 0.07f, 0.12f * Laikka(u, v, 0.49f, 0.34f, 0.13f, 0.74f, 0.82f)));
                    // Reunojen varjo (radial 94 % 150 % at 40 % 10 %) ja alanurkat.
                    float dx = (u - 0.40f) / 0.94f, dy = (v - 0.10f) / 1.50f;
                    float r = Mathf.Sqrt(dx * dx + dy * dy);
                    float varjo = r < 0.22f ? 0 : r < 0.62f ? Mathf.Lerp(0, 0.22f, (r - 0.22f) / 0.40f) : Mathf.Lerp(0.22f, 0.46f, Mathf.Clamp01((r - 0.62f) / 0.38f));
                    c = Paalle(c, new Color(0.33f, 0.2f, 0.063f, varjo));
                    c = Paalle(c, new Color(0.376f, 0.227f, 0.07f, 0.44f * Laikka(u, v, 0.02f, 1.06f, 0.44f, 0.96f, 0.74f)));
                    c = Paalle(c, new Color(0.376f, 0.227f, 0.07f, 0.40f * Laikka(u, v, 0.98f, 1.08f, 0.40f, 0.88f, 0.72f)));
                    px[y * W + x] = c;
                }
                paperi.SetPixels(px);
                paperi.Apply(false, true);
                return paperi;
            }
        }

        /// <summary>
        /// Kuvaputken pinnat (Resources/Radio/, tyokalut/radiopinnat.py): 9-slice kotelo ja kehykset, lasin
        /// päällyskuva ja toistuva viivainpaperi. Palauttaa false, jos kuvaa ei ole (vanha käännös).
        /// </summary>
        static class RadioPinnat
        {
            static readonly Dictionary<string, Texture2D> kuvat = new Dictionary<string, Texture2D>();

            public static Texture2D Kuva(string nimi)
            {
                if (!kuvat.TryGetValue(nimi, out var t)) kuvat[nimi] = t = Resources.Load<Texture2D>("Radio/" + nimi);
                return t;
            }

            static bool Viipaloi(VisualElement e, string nimi, int viipale, float mittakaava)
            {
                var t = Kuva(nimi);
                if (t == null) return false;
                e.style.backgroundImage = new StyleBackground(t);
                e.style.unitySliceLeft = e.style.unitySliceRight = e.style.unitySliceTop = e.style.unitySliceBottom = viipale;
                e.style.unitySliceScale = mittakaava;
                return true;
            }

            /// <summary>Puukotelo: 1024 × 320, reunat 40 px puolitettuna (20 pt).</summary>
            public static bool Kotelo(VisualElement e) => Viipaloi(e, "radio-kotelo", 40, 0.5f);

            /// <summary>Messinkikehys: 128 × 128, rengas 16 px noin 5 pt:ksi.</summary>
            public static bool Kehys(VisualElement e) => Viipaloi(e, "radio-kehys", 16, 0.32f);

            /// <summary>Lasin heijastus ja naarmut koko kehyksen yli (alfa lineaarisena, radiopinnat.py).</summary>
            public static bool Lasi(VisualElement e)
            {
                var t = Kuva("radio-lasi");
                if (t == null) { e.style.display = DisplayStyle.None; return false; }
                e.style.backgroundImage = new StyleBackground(t);
                e.style.backgroundSize = new BackgroundSize(Length.Percent(100), Length.Percent(100));
                return true;
            }

            /// <summary>Viivainpaperi toistuu vaakasuunnassa asteikon korkeudella.</summary>
            public static bool Paperi(VisualElement e)
            {
                var t = Kuva("radio-viivain");
                if (t == null) return false;
                e.style.backgroundImage = new StyleBackground(t);
                e.style.backgroundRepeat = new BackgroundRepeat(Repeat.Repeat, Repeat.NoRepeat);
                e.style.backgroundSize = new BackgroundSize(Length.Auto(), Length.Percent(100));
                return true;
            }
        }

        /// <summary>Asteikon viivat alareunan 16 px:n kaistalla (.radio-asteikko::after).</summary>
        sealed class Asteikkoviivat : VisualElement
        {
            static readonly Color Viiva = new Color32(58, 42, 23, 255);

            public Asteikkoviivat() { generateVisualContent += Piirra; }

            void Piirra(MeshGenerationContext mgc)
            {
                var r = contentRect;
                if (float.IsNaN(r.width) || r.width <= 0) return;
                var p = mgc.painter2D;
                p.lineWidth = 1f;
                p.lineCap = LineCap.Butt;
                void Viivat(float vali, float korkeus, float alfa)
                {
                    p.BeginPath();
                    for (float x = r.xMin + 0.5f; x < r.xMax; x += vali)
                    {
                        p.MoveTo(new Vector2(x, r.yMax));
                        p.LineTo(new Vector2(x, r.yMax - korkeus));
                    }
                    p.strokeColor = new Color(Viiva.r, Viiva.g, Viiva.b, alfa);
                    p.Stroke();
                }
                Viivat(8f, 8f, 0.5f);
                Viivat(40f, 15f, 0.85f);
                p.BeginPath();
                p.MoveTo(new Vector2(r.xMin, r.yMax - 0.5f));
                p.LineTo(new Vector2(r.xMax, r.yMax - 0.5f));
                p.strokeColor = new Color(Viiva.r, Viiva.g, Viiva.b, 0.55f);
                p.Stroke();
            }
        }
    }

    /// <summary>
    /// Radion merkkivalo (web teeLamppu, .radio-lamppu): kromattu rengas, kupera lasi ja
    /// hehku kotelon päällä. Painettava alue 44 × 44, lamppu 22 (leveällä 26) keskellä.
    /// </summary>
    public sealed class RadioLamppu : VisualElement
    {
        static readonly Color Puu = new Color32(0x6b, 0x44, 0x23, 255);
        RadioVaihe vaihe = RadioVaihe.Hiljaa;
        bool tauko;
        float halkaisija = 22f;

        public RadioLamppu(System.Action painettu)
        {
            pickingMode = PickingMode.Position;
            this.AddManipulator(new Clickable(() => painettu?.Invoke()));
            generateVisualContent += Piirra;
        }

        public RadioVaihe Vaihe { get => vaihe; set { if (vaihe == value) return; vaihe = value; MarkDirtyRepaint(); } }
        public bool Tauko { get => tauko; set { if (tauko == value) return; tauko = value; MarkDirtyRepaint(); } }
        public float Halkaisija { get => halkaisija; set { halkaisija = value; MarkDirtyRepaint(); } }

        static Color V(string hex) => Kuviot.Vari(hex);

        // Lasin säteittäinen liukuväri "circle at 34% 28%" (css/radio.css).
        (Color c, float t)[] Lasi()
        {
            switch (vaihe)
            {
                case RadioVaihe.Soi: return new[] { (V("#ffe3d6"), 0f), (V("#ff7d5e"), 0.24f), (V("#d9331d"), 0.58f), (V("#7d1508"), 1f) };
                case RadioVaihe.Viritys: return new[] { (V("#fff2cf"), 0f), (V("#ffc65e"), 0.26f), (V("#d08a12"), 0.60f), (V("#6d4406"), 1f) };
                case RadioVaihe.Virhe: return new[] { (V("#9a6a62"), 0f), (V("#6d2a22"), 0.34f), (V("#3a0f0a"), 1f) };
                default: return new[] { (V("#d59d92"), 0f), (V("#a8564a"), 0.30f), (V("#6f2018"), 0.62f), (V("#3d0d08"), 1f) };
            }
        }

        static Color Liukuvari((Color c, float t)[] pysakit, float t)
        {
            for (int i = 1; i < pysakit.Length; i++)
                if (t <= pysakit[i].t) return Color.Lerp(pysakit[i - 1].c, pysakit[i].c, (t - pysakit[i - 1].t) / (pysakit[i].t - pysakit[i - 1].t));
            return pysakit[pysakit.Length - 1].c;
        }

        /// <summary>Tauolla: saturate(.35) brightness(.55).</summary>
        Color Suodin(Color c)
        {
            if (!tauko) return c;
            float l = 0.2126f * c.r + 0.7152f * c.g + 0.0722f * c.b;
            return new Color((l + (c.r - l) * 0.35f) * 0.55f, (l + (c.g - l) * 0.35f) * 0.55f, (l + (c.b - l) * 0.35f) * 0.55f, c.a);
        }

        static void Ympyra(Painter2D p, Vector2 c, float r, Color vari)
        {
            p.BeginPath();
            p.Arc(c, r, Angle.Degrees(0f), Angle.Degrees(360f));
            p.ClosePath();
            p.fillColor = vari;
            p.Fill();
        }

        static void Rengas(Painter2D p, Vector2 c, float ulko, float sisa, Color vari)
        {
            p.BeginPath();
            p.Arc(c, ulko, Angle.Degrees(0f), Angle.Degrees(360f));
            p.ClosePath();
            p.MoveTo(c + new Vector2(sisa, 0));
            p.Arc(c, sisa, Angle.Degrees(360f), Angle.Degrees(0f), ArcDirection.CounterClockwise);
            p.ClosePath();
            p.fillColor = vari;
            p.Fill(FillRule.OddEven);
        }

        void Piirra(MeshGenerationContext mgc)
        {
            var r = contentRect;
            if (float.IsNaN(r.width) || r.width <= 0) return;
            var p = mgc.painter2D;
            var c = r.center;
            float R = halkaisija / 2f;

            // Hehku (.radio-lamppu-hehku): inset −16 px (leveällä −20), closest-side.
            float hehkuPeitto = tauko ? 0 : vaihe == RadioVaihe.Soi ? 1f : vaihe == RadioVaihe.Viritys ? 0.85f : 0f;
            if (hehkuPeitto > 0)
            {
                bool meripihka = vaihe == RadioVaihe.Viritys;
                var perus = meripihka ? new Color(1f, 196 / 255f, 88 / 255f) : new Color(1f, 110 / 255f, 70 / 255f);
                float[] asemat = { 0.40f, 0.56f, 0.76f, 1f };
                float[] alfat = meripihka ? new[] { 0.42f, 0.22f, 0.06f, 0f } : new[] { 0.46f, 0.24f, 0.07f, 0f };
                float H = R + (halkaisija > 24 ? 20f : 16f);
                const int Askelia = 14;
                for (int i = 0; i < Askelia; i++)
                {
                    float s0 = Mathf.Lerp(0.40f, 1f, i / (float)Askelia), s1 = Mathf.Lerp(0.40f, 1f, (i + 1) / (float)Askelia);
                    float s = (s0 + s1) / 2, a = 0;
                    for (int k = 1; k < asemat.Length; k++)
                        if (s <= asemat[k]) { a = Mathf.Lerp(alfat[k - 1], alfat[k], (s - asemat[k - 1]) / (asemat[k] - asemat[k - 1])); break; }
                    a += 0.16f * (meripihka ? 0.9f : 1f) * Mathf.Clamp01(1f - (s - 0.35f) / 0.65f);
                    if (s1 * H <= R) continue;
                    var vari = perus;
                    vari.a = Pistenaytto.Peitto(a * hehkuPeitto, perus, Puu);
                    Rengas(p, c, s1 * H, Mathf.Max(R, s0 * H), vari);
                }
            }

            // Varjo 0 1px 2px ja kromirengas (.radio-lamppu-kehys).
            Ympyra(p, c + new Vector2(0, 1), R + 0.8f, new Color(0, 0, 0, Pistenaytto.Peitto(0.45f, Color.black, Puu)));
            Ympyra(p, c, R, V("#4c4943"));
            Ympyra(p, c + new Vector2(0, -0.35f), R - 0.6f, V("#79736a"));
            Ympyra(p, c + new Vector2(0, -0.9f), R - 1.6f, V("#8b857a"));
            Ympyra(p, c + new Vector2(0, 0.9f), R - 2.2f, V("#605c55"));

            // Lasi: kupera, vaalea kohta ylävasemmalla (34 % 28 %), tumma reuna alaoikealla.
            float lasiR = R - (halkaisija > 24 ? 4f : 3f);
            var pysakit = Lasi();
            var valo = c + new Vector2(-0.16f, -0.22f) * (lasiR * 2f);
            const int Kerroksia = 12;
            for (int i = 0; i < Kerroksia; i++)
            {
                float k = i / (float)Kerroksia;                  // 0 = reuna, → valopiste
                var keski = Vector2.Lerp(c, valo, k);
                float sade = lasiR * (1f - k);
                Ympyra(p, keski, sade, Suodin(Liukuvari(pysakit, Mathf.Lerp(0.79f, 0.05f, k))));
            }

            // Heijastus (::after): kallistettu ellipsi, valkoinen .75 → .05.
            var e = c + new Vector2((0.18f + 0.19f - 0.5f) * 2 * lasiR, (0.12f + 0.13f - 0.5f) * 2 * lasiR);
            Ellipsi(p, e, 0.38f * lasiR, 0.26f * lasiR, -24f, new Color(1, 1, 1, Pistenaytto.Peitto(tauko ? 0.2f : 0.38f, Color.white, V("#a8564a"))));
            Ellipsi(p, e + new Vector2(0, -0.06f * lasiR), 0.26f * lasiR, 0.14f * lasiR, -24f, new Color(1, 1, 1, Pistenaytto.Peitto(tauko ? 0.25f : 0.5f, Color.white, V("#d59d92"))));
        }

        static void Ellipsi(Painter2D p, Vector2 c, float rx, float ry, float kulma, Color vari)
        {
            float k = kulma * Mathf.Deg2Rad, cs = Mathf.Cos(k), sn = Mathf.Sin(k);
            p.BeginPath();
            const int N = 20;
            for (int i = 0; i <= N; i++)
            {
                float a = i / (float)N * Mathf.PI * 2;
                float x = Mathf.Cos(a) * rx, y = Mathf.Sin(a) * ry;
                var q = c + new Vector2(x * cs - y * sn, x * sn + y * cs);
                if (i == 0) p.MoveTo(q); else p.LineTo(q);
            }
            p.ClosePath();
            p.fillColor = vari;
            p.Fill();
        }
    }

    /// <summary>Radion ▶-napit pallolla (web radio.js pallonNappiElementti, piirraPallonNapinSisus).</summary>
    public sealed class RadioNapit
    {
        const float Laatikko = 44f, Rengas = 13f, Hehku = 21f, Ulkokeha = 17f, Kolmio = 4.6f;
        static readonly Color Muste = new Color32(0x46, 0x33, 0x1f, 255), Punainen = new Color32(0xc2, 0x45, 0x2f, 255);

        sealed class Nappi : VisualElement
        {
            public RadioNappi Tieto;
            public Nappi() { generateVisualContent += Piirra; }

            void Piirra(MeshGenerationContext mgc)
            {
                var d = Tieto;
                if (d == null) return;
                var p = mgc.painter2D;
                var c = new Vector2(Laatikko / 2f, Laatikko / 2f);
                if (d.Soi)
                {
                    p.fillColor = new Color(Punainen.r, Punainen.g, Punainen.b, 0.16f);
                    p.BeginPath();
                    p.Arc(c, Hehku, Angle.Degrees(0f), Angle.Degrees(360f));
                    p.Fill();
                }
                var rengas = d.Soi ? Punainen : Muste;
                p.strokeColor = new Color(rengas.r, rengas.g, rengas.b, d.OnKanava ? 0.85f : 0.34f);
                p.lineWidth = d.Soi ? 2.4f : 1.4f;
                if (d.OnKanava)
                {
                    p.BeginPath();
                    p.Arc(c, Rengas, Angle.Degrees(0f), Angle.Degrees(360f));
                    p.Stroke();
                }
                else
                {
                    // Katkoviiva 2 / 3,5 (web stroke-dasharray) kaarina renkaan kehallä.
                    float keha = 2f * Mathf.PI * Rengas;
                    for (float a = 0f; a < keha; a += 5.5f)
                    {
                        p.BeginPath();
                        p.Arc(c, Rengas, Angle.Radians(a / Rengas), Angle.Radians(Mathf.Min(a + 2f, keha) / Rengas));
                        p.Stroke();
                    }
                }
                if (d.Soi)
                {
                    p.strokeColor = new Color(Punainen.r, Punainen.g, Punainen.b, 0.62f);
                    p.lineWidth = 1.2f;
                    p.BeginPath();
                    p.Arc(c, Ulkokeha, Angle.Degrees(0f), Angle.Degrees(360f));
                    p.Stroke();
                }
                if (d.OnKanava)
                {
                    // Optisesti keskitetty kolmio: massa vasemmalla, kärki yli.
                    var t = d.Soi ? Punainen : Muste;
                    p.fillColor = new Color(t.r, t.g, t.b, d.Soi ? 1f : 0.72f);
                    p.BeginPath();
                    p.MoveTo(c + new Vector2(-Kolmio * 0.55f, -Kolmio));
                    p.LineTo(c + new Vector2(Kolmio, 0f));
                    p.LineTo(c + new Vector2(-Kolmio * 0.55f, Kolmio));
                    p.ClosePath();
                    p.Fill();
                }
            }
        }

        readonly VisualElement juuri;
        readonly Dictionary<string, Nappi> napit = new Dictionary<string, Nappi>();
        // Radiouudistus (build 12, suunnitelma luku 4): mastot korvaavat ▶-napit, ja valitun maston nimi on sen vieressä.
        readonly Label mastonNimi;
        RadioLinssi linssi;

        /// <summary>Mastot piirretään (Natiiviseppä asettaa MastoPiirto): ▶-napit piiloon, jotteivät ne sieppaa maston juurelta.</summary>
        static bool Mastot => LinssiOhjain.RadioSovitin.MastoPiirto != null;

        public RadioNapit(VisualElement isa)
        {
            juuri = Rakenne.El("mk-radionapit", isa, PickingMode.Ignore);
            juuri.style.display = DisplayStyle.None;
            mastonNimi = Rakenne.Teksti("", "mk-radio-mastonimi", juuri);
            mastonNimi.style.visibility = Visibility.Hidden;
            Kirjasimet.Aseta(mastonNimi, Kirjasin.LukuLihava);
        }

        public void Sido(RadioLinssi l)
        {
            if (ReferenceEquals(l, linssi)) return;
            if (linssi != null) { linssi.NapitMuuttuivat -= Rakenna; linssi.TilaMuuttui -= TilaMuuttui; }
            linssi = l;
            if (l != null) { l.NapitMuuttuivat += Rakenna; l.TilaMuuttui += TilaMuuttui; }
            Rakenna();
        }

        void TilaMuuttui(RadioTila _) => Rakenna();

        void Rakenna()
        {
            var tiedot = Mastot ? System.Array.Empty<RadioNappi>() : linssi?.Napit ?? System.Array.Empty<RadioNappi>();
            var mukana = new HashSet<string>();
            foreach (var d in tiedot)
            {
                if (d?.Kaupunki == null || !mukana.Add(d.Kaupunki)) continue;
                if (!napit.TryGetValue(d.Kaupunki, out var n))
                {
                    n = new Nappi();
                    n.AddToClassList("mk-radionappi");
                    n.style.visibility = Visibility.Hidden;
                    string kaupunki = d.Kaupunki;
                    n.RegisterCallback<ClickEvent>(e => { e.StopPropagation(); linssi?.SoitaKaupunki(kaupunki); });
                    juuri.Add(n);
                    napit[d.Kaupunki] = n;
                }
                bool muuttui = n.Tieto == null || n.Tieto.Soi != d.Soi || n.Tieto.OnKanava != d.OnKanava;
                n.Tieto = d;
                n.tooltip = d.OnKanava ? "Soita " + d.Kaupunki : d.Kaupunki;
                if (muuttui) n.MarkDirtyRepaint();
                // Soiva päällimmäiseksi, jotta hehku ei jää naapurin alle.
                if (d.Soi) n.BringToFront();
            }
            foreach (var k in napit.Keys.Where(k => !mukana.Contains(k)).ToList())
            {
                napit[k].RemoveFromHierarchy();
                napit.Remove(k);
            }
            var tila = linssi?.Tila;
            string nimi = Mastot && tila?.KaupunkiId != null ? tila.KaupunkiNimi : null;
            mastonNimi.text = (nimi ?? "").ToUpperInvariant();
            if (string.IsNullOrEmpty(nimi)) mastonNimi.style.visibility = Visibility.Hidden;
            juuri.style.display = napit.Count > 0 || !string.IsNullOrEmpty(nimi) ? DisplayStyle.Flex : DisplayStyle.None;
            Paivita();
        }

        /// <summary>Joka ruutu: napit pallon pisteiden päälle (Unityn ruutupikselit → paneeli).</summary>
        public void Paivita()
        {
            PaivitaNimi();
            if (napit.Count == 0 || juuri.panel == null) return;
            foreach (var n in napit.Values)
            {
                var piste = LinssiOhjain.Ruutupiste(n.Tieto.Lat, n.Tieto.Lon);
                if (!piste.HasValue) { if (n.style.visibility.value != Visibility.Hidden) n.style.visibility = Visibility.Hidden; continue; }
                var p = RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(piste.Value.x, Screen.height - piste.Value.y));
                n.style.left = p.x - Laatikko / 2f;
                n.style.top = p.y - Laatikko / 2f;
                if (n.style.visibility.value != Visibility.Visible) n.style.visibility = Visibility.Visible;
            }
        }

        // Nimen paikka hyväksytystä havainnekuvasta (kaappaukset/radiouudistus-20260924/1-paakuva-ipad.jpg, 1024 pt):
        // vasen reuna 15 pt maston keskilinjasta oikealle, tekstin keskikohta 45 pt maston puolivälin alapuolella.
        const float NimiX = 15f, NimiY = 45f;

        /// <summary>Valitun maston nimi sen viereen (RadioMastot.RuutuPaikka: maston puoliväli, origo vasen alakulma).</summary>
        void PaivitaNimi()
        {
            if (string.IsNullOrEmpty(mastonNimi.text) || juuri.panel == null) return;
            var mastot = Matkakirja.RadioMastot.Instanssi;
            string id = linssi?.Tila?.KaupunkiId;
            if (mastot == null || !mastot.RuutuPaikka(id, out var r))
            {
                if (mastonNimi.style.visibility.value != Visibility.Hidden) mastonNimi.style.visibility = Visibility.Hidden;
                return;
            }
            var p = RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(r.x, Screen.height - r.y));
            float h = mastonNimi.layout.height;
            mastonNimi.style.left = Mathf.Round(p.x + NimiX);
            mastonNimi.style.top = Mathf.Round(p.y + NimiY - (float.IsNaN(h) ? 10f : h / 2f));
            if (mastonNimi.style.visibility.value != Visibility.Visible) mastonNimi.style.visibility = Visibility.Visible;
        }
    }
}
