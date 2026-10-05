// ISS-KYTKINPÖYTÄ (Linssiseppä 30.9.2026, Päätoimittajan erä ennen Codexin kuvia): kyydin säätimet alareunan kapeana
// ohjauspöytänä avaruusaluksen kytkimin (IssKytkimet: paikkamerkit, jotka vaihtuvat Codexin kuviin yhdellä muutoksella).
//
//   rivi 1  merkkivalo LIVE (vihreä LIVE, meripihka nopeutettu; napautus nopeutettuna = Palaa LIVE) · lukemanäyttö
//           (rivi 1 = kyydin tietorivi ISS · 429 km · 27 550 km/h, rivi 2 = ylilento tai lennon kohde)
//   rivi 2  NOPEUS kiertokytkin LIVE/10×/100×/1000× · PILVET nuppi · VUODENAIKA nuppi (kuukausi) · VUOROKAUSI nuppi · KOHDE painike
//           (lista pöydän yläpuolelle) · KUVAA painike (ISS-kamera, 1.10.; aiemmin OMA-vipu) · SULKU painike
//
// Pöydän leveys ruutu − 24, enintään 560 pt, keskellä; korkeus ~116 pt (iPhone 874 pt: 13 %). Tekstit piirtää peli.
// IssKyytiNakyma omistaa toiminnot ja tilan; tämä on vain kokoonpano (A/B `astro kyyti poyta 0|1`: 0 = entinen välilehtipaneeli).
//
// KERROSTILA (30.9., Päätoimittaja: aito avaruusalusmoduuli Linnanrakentajan Cycles-kerroksista, IssPaneeliKuvat): kun asettelun
// kerrokset ovat Resourcesissa, pöytä on kiinteän kokoinen kytkinryhmä (puhelin 402, tabletti 608 × 168 pt, kapeammalla ruudulla
// skaalattuna): pohja kolmena viipaleena, liikkuvat osat kuvina tilan mukaan (nopeus 4 asentoa, nuppi 24 × 15°, painike ylös/alas,
// vipu ylös/alas, kansi 6 kehystä), moduulit näkymättöminä osuma-aloina sprites.json-ankkureihin ja valokerrokset summattuina
// IssValot-varjostimella yhdeksi RenderTextureksi vain tilan muuttuessa (painot: LIVE vihreä / PALAA meripihka, painettu kirkastuu).
// Ilman kerroksia (tai `astro kyyti kerrokset 0`) kaikki kuten ennen.
//
// PIENI JA SUURI (omistaja 2.10. 21.3x kohta 8: "paneeli pienemmäksi ruudun alareunaan ... napautus suurentaa sen animoidusti
// isoksi ... napautus sen ulkopuolelle pienentää"; Päätoimittajan tarkennus): ryhmäkuva leikataan kolmeksi ikkunaksi ilman uusia
// kuvia — MITTARI (LIVE + lukema), VASEN (NOPEUS, PILVET, VUODENAIKA, VUOROKAUSI) ja OIKEA (KOHDE, KUVAA, POISTU) — ja pohja
// venyy 9-slicenä niiden taakse. PIENI (oletus kyydin avautuessa): vain mittari noin 55 %:n kokoisena alareunassa keskellä.
// SUURI: mittari ja kaksi säädinriviä (4 + 3) enintään 2 ×; jos kaksi riviä ei mahdu 45 %:iin ruudun korkeudesta yhtä suurina
// (iPhone vaaka), yksi rivi (luettavampi valitaan, tasapelissä pienempi peitto). Tekstit (lukema, kilvet) vähintään 11 pt
// ruudulla, kun ne mahtuvat. Siirtymä Tyylikirja.Kesto.Liuku (240 ms). Napautus pieneen pöytään vain suurentaa (ei laukaise
// LIVE-valoa); napautus suuren ohi pienentää eikä niele kosketusta (kartan veto toimii). Testi `astro kyyti paneeli pieni|suuri|tila`.
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class IssKytkinpoyta
    {
        public readonly IssKytkimet.Pohja Juuri;
        public readonly IssKytkimet.Merkkivalo Live;
        public readonly IssKytkimet.Lukema Lukema;
        public readonly IssKytkimet.Kiertokytkin Nopeus;
        public readonly IssKytkimet.Nuppi Pilvet, Vuodenaika, Vuorokausi;
        public readonly IssKytkimet.Painike Kohde, Kuvaa, Sulku;

        public const float PoytaEnintaan = 560f;

        readonly VisualElement ylarivi, saatimet;
        readonly IssKytkimet.Kytkin[] moduulit;
        readonly string[] osaNimet = { "live", "lukema", "nopeus", "pilvet", "kuukausi", "vuorokausi", "kohde", "kuvaa", "poistu" };

        public IssKytkinpoyta(VisualElement isa, Action<int> nopeus, Action<float> pilvet, Action<float> kuukausi, Action<float> vuorokausi,
            Action kohde, Action kuvaa, Action sulku, Action palaaLive)
        {
            Juuri = new IssKytkimet.Pohja { name = "IssKytkinpoyta" };
            var s = Juuri.style;
            s.position = Position.Absolute; s.bottom = 8;
            s.paddingLeft = 10; s.paddingRight = 10; s.paddingTop = 8; s.paddingBottom = 6;
            // Ohinapautus ja pienen tilan ensimmäinen napautus paneelin juuressa (TrickleDown): kartan napautukset tulevat sinne.
            Juuri.RegisterCallback<AttachToPanelEvent>(e => Liita(e.destinationPanel?.visualTree));
            Juuri.RegisterCallback<DetachFromPanelEvent>(_ => Liita(null));
            isa.Add(Juuri);

            ylarivi = new VisualElement { pickingMode = PickingMode.Ignore };
            ylarivi.style.flexDirection = FlexDirection.Row; ylarivi.style.alignItems = Align.Center; ylarivi.style.marginBottom = 14;
            Juuri.Add(ylarivi);
            Live = new IssKytkimet.Merkkivalo("LIVE");
            Live.AddManipulator(new Clickable(() => palaaLive?.Invoke()));
            ylarivi.Add(Live);
            Lukema = new IssKytkimet.Lukema();
            Lukema.style.flexGrow = 1; Lukema.style.marginLeft = 6;
            ylarivi.Add(Lukema);

            saatimet = new VisualElement { pickingMode = PickingMode.Ignore };
            saatimet.style.flexDirection = FlexDirection.Row; saatimet.style.justifyContent = Justify.SpaceBetween;
            Juuri.Add(saatimet);
            string[] kertoimet = new string[Matkakirja.Linssit.Iss.Simukello.Nopeudet.Length];
            for (int i = 0; i < kertoimet.Length; i++)
                kertoimet[i] = Matkakirja.Linssit.Iss.Simukello.Nopeudet[i] == 1 ? "LIVE" : Matkakirja.Linssit.Iss.Simukello.Nopeudet[i] + "×";
            Nopeus = new IssKytkimet.Kiertokytkin("NOPEUS", kertoimet, i => nopeus?.Invoke(Matkakirja.Linssit.Iss.Simukello.Nopeudet[i]));
            Pilvet = new IssKytkimet.Nuppi("PILVET", 0f, 1f, v => pilvet?.Invoke(v));
            // Vuodenaika (omistaja 1.10.): 0 talvi, 1 kevät, 2 kesä, 3 syksy (Matkakirja.Linssit.Iss.Vuodenaika); sama nuppi.
            Vuodenaika = new IssKytkimet.Nuppi("VUODENAIKA", 0f, 3f, v => kuukausi?.Invoke(v), kokonaisluku: true);
            // Vuorokaudenaika (omistaja 1.10.): 0 aamu, 1 päivä, 2 ilta, 3 yö (Matkakirja.Linssit.Iss.Vuorokausi); sama nuppi, v4-paneeli.
            Vuorokausi = new IssKytkimet.Nuppi("VUOROKAUSI", 0f, 3f, v => vuorokausi?.Invoke(v), kokonaisluku: true);
            Kohde = new IssKytkimet.Painike("KOHDE", "LENNÄ", () => kohde?.Invoke());
            // ISS-kamera (omistaja 1.10.2026, A): KUVAA korvaa OMA PAIKKA -vivun (oma paikka on KOHDE-listan rivinä); paneeli v3.
            Kuvaa = new IssKytkimet.Painike("KUVAA", "●", () => kuvaa?.Invoke());
            // Ilman ×-merkkiä, pelkkä POISTU (omistaja 5.10.2026 klo 00.1x, ✕-inventaario: turhat x:t pois).
            Sulku = new IssKytkimet.Painike("POISTU", "", () => sulku?.Invoke(), leveys: 52f);
            foreach (var m in new VisualElement[] { Nopeus, Pilvet, Vuodenaika, Vuorokausi, Kohde, Kuvaa, Sulku }) saatimet.Add(m);
            moduulit = new IssKytkimet.Kytkin[] { Live, Lukema, Nopeus, Pilvet, Vuodenaika, Vuorokausi, Kohde, Kuvaa, Sulku };
            foreach (var m in moduulit) m.Muuttui += () => { if (asettelu != null) PaivitaKerrokset(); };
        }

        /// <summary>Leveys ja keskitys turva-alueen leveydestä (ruutu − 24, enintään 560 pt). Kerrostilassa pöytä on turva-alueen
        /// levyinen läpinäkyvä kehys, jonka sisällä pohja ja ikkunat (Laske); se jatkuu alareunan turvavälin (alaReuna pt) yli
        /// ruudun reunaan (Päätoimittaja: konsoli jatkuu alas).</summary>
        public void Asettele(float turvanLeveys, float alaReuna = float.NaN)
        {
            if (!(turvanLeveys > 0)) return;
            poytaLeveys = turvanLeveys;
            if (!float.IsNaN(alaReuna)) this.alaReuna = alaReuna;
            // Asettelu laitteen lyhyemmästä sivusta: puhelin vaakana käyttää puhelimen @3x-kerroksia (ei tabletin @2x).
            string a = IssPaneeliKuvat.Asettelu(RuudunKorkeus > 1f ? Mathf.Min(turvanLeveys, RuudunKorkeus) : turvanLeveys);
            if (!IssPaneeliKuvat.Paikalla(a)) a = null;
            if (a != asettelu) { if (asettelu != null) PurraKerrokset(); if (a != null) RakennaKerrokset(a); }
            if (asettelu != null)
            {
                // Liu'un aikana Askel laskee kohteen joka ruutu uudesta koosta; muuten asento heti.
                if (ajo == null || !ajo.isActive) Nayta(Laske(Suuri));
                return;
            }
            float lw = Mathf.Min(PoytaEnintaan, turvanLeveys - 24f);
            Juuri.style.width = lw;
            Juuri.style.left = (turvanLeveys - lw) * 0.5f;
        }

        // ---------------- Kerrostila (Linnanrakentajan v1) ----------------
        string asettelu;
        float poytaLeveys = 1e6f, alaReuna;
        /// <summary>Pohja (3 viipaletta, 9-slice pystyyn) ikkunoiden takana; ottaa kosketuksen (ei läpi karttaan).</summary>
        VisualElement taso;
        /// <summary>Ryhmäkuvan ikkunat: 0 mittari, 1 vasen säädinryhmä, 2 oikea säädinryhmä.</summary>
        readonly Ikkuna[] ikkunat = new Ikkuna[3];
        readonly Dictionary<IssKytkimet.Kytkin, VisualElement> osat = new Dictionary<IssKytkimet.Kytkin, VisualElement>();

        /// <summary>Ryhmäkuvan rajaus omaksi elementikseen: rajaus (overflow hidden, skaalataan) → sisus (koko ryhmä −alue.xy:ssä):
        /// ryhmäkuva, alueen moduulit, valosumma, legendavalo ja tekstit. Valosumma on sama RenderTexture kaikissa ikkunoissa.</summary>
        sealed class Ikkuna
        {
            public VisualElement rajaus, sisus, valot, legendat, tekstit;
            public Rect alue;
        }

        RenderTexture valoRt;
        Material valoMat;
        Vector4 painotA = new Vector4(-1, 0, 0, 0), painotB;
        bool legendaMeripihka;
        IVisualElementScheduledItem pulssi;
        /// <summary>Painikkeen valo levossa: v1-simulaattorikuvassa 0,55 peitti legendan (LENNÄ/POISTU) → hehku vain vihjeenä.</summary>
        const float LepoValo = 0.15f;
        static readonly string[] ValoJarjestys = { "paneeli", "live-vihrea", "live-meripihka", "kohde", "poistu", "kuvaa" };

        /// <summary>Kerrostilan asettelu (puhelin | tabletti) tai null (paikkamerkit / kehys).</summary>
        public string Asettelu => asettelu;

        /// <summary>A/B `astro kyyti vaakarajaus 0|1`: 0 = ei korkeusrajaa (45 % ruudusta) suuressa tilassa, kuvapariin.</summary>
        public static bool VaakaRajaus = true;
        /// <summary>A/B `astro kyyti sivulevyt 0|1`: 1 = pohja koko ruudun leveydeltä (ennen 30.9. iltaa).</summary>
        public static bool Sivulevyt;

        /// <summary>Ruudun (juuren) korkeus pt; asettaja IssKyytiNakyma ennen Asettelea.</summary>
        public float RuudunKorkeus;

        /// <summary>Pöydän näkyvän yläreunan (kupu) etäisyys Juuren yläreunasta (pt, näkyvä asento).</summary>
        public float YlaReuna => asettelu != null ? nyky.m.y : 0f;
        /// <summary>Pohjan näkyvä suorakulmio Juuren koordinaateissa (kohdelista pöydän levyiseksi); kehystilassa koko Juuri.</summary>
        public Rect Nakyva => asettelu != null ? nyky.taso : new Rect(0, 0, Juuri.layout.width, Juuri.layout.height);

        static VisualElement Kuvakerros(VisualElement isa, Rect r, string nimi)
        {
            var e = new VisualElement { name = nimi, pickingMode = PickingMode.Ignore };
            var s = e.style;
            s.position = Position.Absolute; s.left = r.x; s.top = r.y; s.width = r.width; s.height = r.height;
            isa.Add(e);
            return e;
        }

        static void AsetaKuva(VisualElement e, Texture2D t)
        {
            if (e == null) return;
            e.style.backgroundImage = t != null ? new StyleBackground(t) : new StyleBackground(StyleKeyword.None);
        }

        /// <summary>Skaala (px/pt): puhelin @3x, tabletti @2x.</summary>
        float Skaala => asettelu == "puhelin" ? 3f : 2f;

        /// <summary>Moduulin kuvakehysten avain (osat.<kehys>) ja siirto: nuppi on renderöity PILVET-paikalle.</summary>
        (string kehys, Vector2 siirto) KuvanKehys(IssKytkimet.Kytkin m)
        {
            if (m == Nopeus) return ("nopeus-0", Vector2.zero);
            if (m == Pilvet) return ("nuppi-00", Vector2.zero);
            if (m == Vuodenaika || m == Vuorokausi)
            {
                var p = IssPaneeliKuvat.Osa(asettelu, "pilvet"); var k = IssPaneeliKuvat.Osa(asettelu, m == Vuodenaika ? "kuukausi" : "vuorokausi");
                return ("nuppi-00", p.HasValue && k.HasValue ? k.Value.center - p.Value.center : Vector2.zero);
            }
            if (m == Kohde) return ("kohde-ylos", Vector2.zero);
            if (m == Sulku) return ("poistu-ylos", Vector2.zero);
            if (m == Kuvaa) return ("kuvaa-ylos", Vector2.zero);
            return (null, Vector2.zero);
        }

        void RakennaKerrokset(string a)
        {
            asettelu = a;
            var g = IssPaneeliKuvat.Ryhma(a);
            var s = Juuri.style;
            s.paddingLeft = 0; s.paddingRight = 0; s.paddingTop = 0; s.paddingBottom = 0;
            s.left = 0; s.scale = StyleKeyword.Null; s.overflow = Overflow.Visible;
            // Juuri on turva-alueen levyinen kehys: vain pohja ja moduulit ottavat kosketuksen.
            Juuri.pickingMode = PickingMode.Ignore;
            Juuri.Kerros = true;
            LaskeAlueet(a, g);

            // Pohja: vasen pääty + keski (venyy) + oikea pääty, 9-slice pystyyn (yläreuna ja säleikkö pysyvät, kaiteet venyvät).
            taso = new VisualElement { name = "IssPaneeliPohja", pickingMode = PickingMode.Position };
            taso.style.position = Position.Absolute; taso.style.flexDirection = FlexDirection.Row;
            taso.style.transformOrigin = new TransformOrigin(Length.Percent(0), Length.Percent(0), 0);
            Juuri.Insert(0, taso);
            float paaty = IssPaneeliKuvat.Paaty(a);
            int yla = Mathf.RoundToInt(PohjaYla * Skaala), ala = Mathf.RoundToInt(PohjaAla * Skaala);
            foreach (var (nimi, kasvaa) in new[] { ("pohja-vasen", false), ("pohja-keski", true), ("pohja-oikea", false) })
            {
                var t = IssPaneeliKuvat.Kuva(a, nimi);
                if (t == null) continue;
                var v = new VisualElement { pickingMode = PickingMode.Ignore };
                v.style.flexShrink = 0;
                if (kasvaa) v.style.flexGrow = 1; else v.style.width = paaty;
                v.style.unitySliceTop = yla; v.style.unitySliceBottom = ala; v.style.unitySliceLeft = 0; v.style.unitySliceRight = 0;
                v.style.unitySliceScale = 1f / Skaala;
                AsetaKuva(v, t);
                taso.Add(v);
            }

            // Ikkunat: ryhmäkuva rajattuna, moduulit osuma-aloina (≥ 48 × 48 pt) liikkuvine osineen, valot, tekstit päällimmäisenä.
            for (int i = 0; i < ikkunat.Length; i++)
            {
                var ik = new Ikkuna { alue = i == 0 ? alueM : i == 1 ? alueL : alueR };
                ik.rajaus = new VisualElement { name = "IssPaneeliIkkuna" + i, pickingMode = PickingMode.Ignore };
                var rs = ik.rajaus.style;
                rs.position = Position.Absolute; rs.width = ik.alue.width; rs.height = ik.alue.height; rs.overflow = Overflow.Hidden;
                rs.transformOrigin = new TransformOrigin(Length.Percent(0), Length.Percent(0), 0);
                Juuri.Add(ik.rajaus);
                ik.sisus = Kuvakerros(ik.rajaus, new Rect(-ik.alue.x, -ik.alue.y, g.x, g.y), "IssPaneeliRyhma");
                AsetaKuva(ik.sisus, IssPaneeliKuvat.Kuva(a, "ryhma"));
                ikkunat[i] = ik;
            }
            ylarivi.style.display = DisplayStyle.None; saatimet.style.display = DisplayStyle.None;
            var sijoitettavat = new List<(Label, Rect?, bool, int)>();
            for (int i = 0; i < moduulit.Length; i++)
            {
                var m = moduulit[i];
                var r = IssPaneeliKuvat.Osa(a, osaNimet[i]);
                if (!r.HasValue) { m.style.display = DisplayStyle.None; continue; }
                var o = r.Value;
                int ix = Palaan(o.center);
                var osuma = m is IssKytkimet.Lukema ? o
                    : Rect.MinMaxRect(Mathf.Min(o.xMin, o.center.x - 32f), Mathf.Min(o.yMin, o.center.y - 32f),
                                      Mathf.Max(o.xMax, o.center.x + 32f), Mathf.Max(o.yMax, o.center.y + 32f));   // 64 pt: vaakaskaalassa ≥ 44
                // Osuma-ala ulottuu moduulin kilpeen (…-levy, esim. KUVAA:n "VALMIS") ja otsikkoon: savuke 1115:ssä napautus kilpeen
                // (iPhone y 792) ei käynnistänyt KUVAA:a, koska kilpi oli moduulin 64 pt:n alueen alapuolella. Leveys ennallaan.
                if (!(m is IssKytkimet.Lukema))
                    foreach (var lisa in new[] { osaNimet[i] + "-levy", osaNimet[i] + "-otsikko" })
                    {
                        var l = IssPaneeliKuvat.Osa(a, lisa);
                        if (l.HasValue) osuma = Rect.MinMaxRect(osuma.xMin, Mathf.Min(osuma.yMin, l.Value.yMin), osuma.xMax, Mathf.Max(osuma.yMax, l.Value.yMax));
                    }
                ikkunat[ix].sisus.Add(m);
                m.Kerros = true;
                var ms = m.style;
                ms.position = Position.Absolute; ms.left = osuma.x; ms.top = osuma.y; ms.width = osuma.width; ms.height = osuma.height;
                ms.minHeight = 0; ms.marginLeft = 0; ms.marginRight = 0; ms.marginTop = 0; ms.marginBottom = 0;
                if (m is IssKytkimet.Saadin sd)
                {
                    sd.Otsikko.style.display = DisplayStyle.None;   // painettu kuvaan
                    if (sd.Arvo != null) sijoitettavat.Add((sd.Arvo, IssPaneeliKuvat.Osa(a, osaNimet[i] + "-levy"), true, ix));
                }
                if (m == Live) { Live.Nimi.style.display = DisplayStyle.None; continue; }
                if (m == Lukema) { sijoitettavat.Add((Lukema.Rivi1, o, false, ix)); sijoitettavat.Add((Lukema.Rivi2, o, false, ix)); continue; }
                var (kehys, siirto) = KuvanKehys(m);
                var kr = (kehys != null ? IssPaneeliKuvat.Kehys(a, kehys) : null) ?? o;
                kr.position += siirto;
                osat[m] = Kuvakerros(m, new Rect(kr.x - osuma.x, kr.y - osuma.y, kr.width, kr.height), "osa-" + osaNimet[i]);
                osat[m].SendToBack();
            }

            foreach (var ik in ikkunat)
            {
                ik.valot = Kuvakerros(ik.sisus, new Rect(0, 0, g.x, g.y), "IssPaneeliValot");
                ik.legendat = Kuvakerros(ik.sisus, new Rect(0, 0, g.x, g.y), "IssPaneeliLegendat");
                ik.tekstit = Kuvakerros(ik.sisus, new Rect(0, 0, g.x, g.y), "IssPaneeliTekstit");
            }
            if (IssPaneeliKuvat.LegendaPulssi)
                pulssi = Juuri.schedule.Execute(() =>
                {
                    float o = 0.9f + 0.1f * Mathf.Sin(Time.unscaledTime * (2f * Mathf.PI / 3f));
                    foreach (var ik in ikkunat) if (ik != null) ik.legendat.style.opacity = o;
                }).Every(100);
            foreach (var (l, r, kilpi, ix) in sijoitettavat) Sijoita(l, r, kilpi, ikkunat[ix].tekstit, ix);
            // Lukeman kaksi riviä pinoon näytön sisään.
            if (Lukema.Rivi1.parent != null && IssPaneeliKuvat.Osa(a, "lukema") is Rect lr)
            {
                var laatikko = Kuvakerros(ikkunat[Palaan(lr.center)].tekstit, lr, "IssPaneeliLukema");
                laatikko.style.justifyContent = Justify.Center; laatikko.style.paddingLeft = 6; laatikko.style.paddingRight = 6;
                foreach (var l in new[] { Lukema.Rivi1, Lukema.Rivi2 })
                {
                    l.style.position = Position.Relative; l.style.left = StyleKeyword.Null; l.style.top = StyleKeyword.Null;
                    l.style.width = StyleKeyword.Null; l.style.height = StyleKeyword.Null; l.style.unityTextAlign = TextAnchor.MiddleLeft;
                    laatikko.Add(l);
                }
            }
            PoistuMerkki(a);
            Lukema.VainRivi1 = !Suuri;
            painotA = new Vector4(-1, 0, 0, 0);
            nyky = default;
            PaivitaKerrokset();
        }

        /// <summary>
        /// POISTU (omistaja 2.10. 21.3x kohta 9): ×-merkki painikkeen lasiin legendan yläpuolelle (alalapussa POISTU, IssKyytiNakyma).
        /// Sarjassa ei ole punaista eikä varoitusvalotilaa (valo-poistu on sama vihreä hehku kuin KOHDE ja KUVAA), joten uutta tilaa
        /// ei tehty: merkki on Tyylikirjan virhevärillä (Tyylikirja.Tila.Virhe). Merkki on painikkeen oma legenda "×".
        /// </summary>
        void PoistuMerkki(string a)
        {
            if (string.IsNullOrEmpty(Sulku.Legenda.text)) return;   // merkki poistettu (5.10.2026)
            if (Sulku.style.display.value == DisplayStyle.None || !(IssPaneeliKuvat.Kehys(a, "poistu-ylos") is Rect k)) return;
            if (!(IssPaneeliKuvat.Osa(a, "poistu") is Rect o)) return;
            var l = Sulku.Legenda;
            Muista(l);
            var laatikko = Kuvakerros(ikkunat[Palaan(o.center)].tekstit,
                new Rect(k.x, k.y + MerkkiYla * k.height, k.width, MerkkiKorkeus * k.height), "poistu-merkki");
            laatikko.style.alignItems = Align.Center; laatikko.style.justifyContent = Justify.Center; laatikko.style.overflow = Overflow.Visible;
            laatikko.Add(l);
            var s = l.style;
            s.position = Position.Relative; s.left = StyleKeyword.Null; s.top = StyleKeyword.Null; s.right = StyleKeyword.Null;
            s.bottom = StyleKeyword.Null; s.width = StyleKeyword.Null; s.height = StyleKeyword.Null; s.flexGrow = 0;
            s.display = DisplayStyle.Flex; s.unityTextAlign = TextAnchor.MiddleCenter;
            s.color = (Color)Tyylikirja.Tila.Virhe; s.fontSize = MerkkiPt; s.unityFontStyleAndWeight = FontStyle.Bold;
        }
        /// <summary>×-merkin paikka painikkeen kuvakehyksessä (lasi 0,33…0,89, kaiverrettu legenda ~0,6): ylä 0,32, korkeus 0,26.
        /// Koko 12 → 22 pt lihavoituna (Päätoimittajan kuvatarkistus 2.10.: 12 pt:n merkki ei erottunut lasista).</summary>
        const float MerkkiYla = 0.32f, MerkkiKorkeus = 0.26f, MerkkiPt = 22f;

        // Tekstien alkuperäinen paikka ja tyyli (palautus kerrostilasta kehykseen).
        readonly List<(Label l, VisualElement isa, int ix, StyleEnum<Position> pos, StyleLength left, StyleLength top, StyleLength right,
            StyleLength bottom, StyleLength width, StyleLength height, StyleLength koko, StyleColor vari, StyleEnum<TextAnchor> tasaus, StyleEnum<DisplayStyle> nakyvyys)> tekstit =
            new List<(Label, VisualElement, int, StyleEnum<Position>, StyleLength, StyleLength, StyleLength, StyleLength, StyleLength, StyleLength, StyleLength, StyleColor, StyleEnum<TextAnchor>, StyleEnum<DisplayStyle>)>();

        static readonly Color TarraTausta = new Color(0.07f, 0.07f, 0.08f, 0.94f), TarraTeksti = new Color(0.95f, 0.95f, 0.92f);

        /// <summary>Tekstin alkuperäinen paikka ja tyyli talteen (PurraKerrokset palauttaa).</summary>
        void Muista(Label l)
        {
            var s = l.style;
            tekstit.Add((l, l.parent, l.parent?.IndexOf(l) ?? -1, s.position, s.left, s.top, s.right, s.bottom, s.width, s.height,
                s.fontSize, s.color, s.unityTextAlign, s.display));
        }

        /// <summary>Kilvet ja niiden ikkuna (fonttikoko ikkunan skaalasta: ≥ 11 pt ruudulla, kun mahtuu).</summary>
        readonly List<(Label l, int ikkuna)> kilvet = new List<(Label, int)>();

        /// <summary>Teksti päällimmäiseen kerrokseen laatikkoonsa; kilpi = tarrakirjoittimen nauha levyn keskelle.</summary>
        void Sijoita(Label l, Rect? r, bool kilpi, VisualElement isa, int ikkuna)
        {
            if (l == null || !r.HasValue) return;
            Muista(l);
            if (!kilpi) return;   // lukeman rivit sijoitetaan pinona (RakennaKerrokset)
            var s = l.style;
            var v = r.Value;
            var levy = Kuvakerros(isa, v, "kilpi");
            levy.style.alignItems = Align.Center; levy.style.justifyContent = Justify.Center; levy.style.overflow = Overflow.Visible;
            levy.Add(l);
            s.position = Position.Relative; s.left = StyleKeyword.Null; s.top = StyleKeyword.Null; s.right = StyleKeyword.Null;
            s.bottom = StyleKeyword.Null; s.width = StyleKeyword.Null; s.height = StyleKeyword.Null;
            s.display = DisplayStyle.Flex;
            s.color = TarraTeksti; s.unityTextAlign = TextAnchor.MiddleCenter;
            s.backgroundColor = TarraTausta;
            s.paddingLeft = 3; s.paddingRight = 3; s.paddingTop = 0.5f; s.paddingBottom = 0.5f;
            s.borderTopLeftRadius = 1.2f; s.borderTopRightRadius = 1.2f; s.borderBottomLeftRadius = 1.2f; s.borderBottomRightRadius = 1.2f;
            s.letterSpacing = 0.5f; s.whiteSpace = WhiteSpace.NoWrap;
            s.textShadow = new TextShadow { offset = new Vector2(0f, 0.6f), blurRadius = 0f, color = new Color(0f, 0f, 0f, 0.8f) };
            s.maxWidth = Mathf.Max(v.width + 10f, sarake);
            kilvet.Add((l, ikkuna));
            SovitaKilpi(l, ikkuna);
            l.RegisterCallback<ChangeEvent<string>>(SovitaKilpiTapahtuma);
        }

        void SovitaKilpiTapahtuma(ChangeEvent<string> e)
        {
            foreach (var (l, i) in kilvet) if (l == e.target) { SovitaKilpi(l, i); return; }
        }

        void SovitaKilpi(Label l, int ikkuna) =>
            l.style.fontSize = KilpiPt(l.text?.Length ?? 0, ikkuna == 1 ? nyky.l.s : ikkuna == 2 ? nyky.r.s : nyky.m.s);

        /// <summary>
        /// Kilven fonttikoko (ryhmän pt) tekstin pituudesta ja ikkunan skaalasta: tavoite 11 pt ruudulla, kun teksti mahtuu
        /// sarakkeeseen (ei ellipsiä: UITK katkaisee vaikka mahtuisi); vähintään entinen pituuden mukainen koko.
        /// </summary>
        float KilpiPt(int n, float s)
        {
            float perus = n <= 7 ? 6.5f : n <= 10 ? 5.6f : n <= 14 ? 4.8f : 4.2f;
            if (!(s > 0.05f)) return perus;
            float mahtuu = (sarake - 4f - 0.5f * n) / (Mathf.Max(n, 1) * MerkinLeveys);
            return Mathf.Max(perus, Mathf.Min(TekstiPt / s, mahtuu));
        }
        /// <summary>Kirjasin.Kone-versaalin keskileveys (em): kilven mahtumisarvio.</summary>
        const float MerkinLeveys = 0.66f;

        /// <summary>Lukeman rivien fonttikoot (ryhmän pt) mittarin skaalasta: yksi rivi ≥ 11 pt ruudulla (enintään 0,7 × näytön
        /// korkeus), kaksi riviä (ylilento) mahtuvat näyttöön, jolloin ne jäävät pienemmiksi.</summary>
        (float r1, float r2) LukemaPt(float s, bool kaksi)
        {
            float h = lukemaKorkeus, t = TekstiPt / Mathf.Max(s, 0.05f);
            return kaksi ? (Mathf.Clamp(t, 7.5f, 0.42f * h), Mathf.Clamp((TekstiPt - 1f) / Mathf.Max(s, 0.05f), 7f, 0.38f * h))
                         : (Mathf.Clamp(t, 9f, 0.7f * h), 7.5f);
        }

        /// <summary>Lukeman ja kilpien fonttikoot näkyvästä asennosta (liu'un aikana joka ruutu: koko kasvaa skaalan mukana).</summary>
        void PaivitaTekstit()
        {
            if (ikkunat[0] == null) return;
            var (r1, r2) = LukemaPt(nyky.m.s, Lukema.KaksiRivia);
            Lukema.Rivi1.style.fontSize = r1; Lukema.Rivi2.style.fontSize = r2;
            foreach (var (l, i) in kilvet) SovitaKilpi(l, i);
        }

        void PurraKerrokset()
        {
            ajo?.Pause();
            pulssi?.Pause(); pulssi = null;
            for (int i = tekstit.Count - 1; i >= 0; i--)
            {
                var t = tekstit[i]; var s = t.l.style;
                t.l.UnregisterCallback<ChangeEvent<string>>(SovitaKilpiTapahtuma);
                if (t.isa != null) t.isa.Insert(Mathf.Clamp(t.ix, 0, t.isa.childCount), t.l);
                s.position = t.pos; s.left = t.left; s.top = t.top; s.right = t.right; s.bottom = t.bottom; s.width = t.width; s.height = t.height;
                s.fontSize = t.koko; s.color = t.vari; s.unityTextAlign = t.tasaus; s.display = t.nakyvyys;
                s.backgroundColor = StyleKeyword.Null; s.paddingLeft = StyleKeyword.Null; s.paddingRight = StyleKeyword.Null;
                s.paddingTop = StyleKeyword.Null; s.paddingBottom = StyleKeyword.Null; s.letterSpacing = StyleKeyword.Null;
                s.borderTopLeftRadius = StyleKeyword.Null; s.borderTopRightRadius = StyleKeyword.Null;
                s.borderBottomLeftRadius = StyleKeyword.Null; s.borderBottomRightRadius = StyleKeyword.Null;
                s.textShadow = StyleKeyword.Null; s.maxWidth = StyleKeyword.Null;
            }
            tekstit.Clear(); kilvet.Clear();
            Lukema.Rivi1.style.fontSize = 11f; Lukema.Rivi2.style.fontSize = 9.5f;
            taso?.RemoveFromHierarchy(); taso = null;
            foreach (var ik in ikkunat) ik?.rajaus.RemoveFromHierarchy();
            Array.Clear(ikkunat, 0, ikkunat.Length);
            foreach (var e in osat.Values) e.RemoveFromHierarchy();
            osat.Clear();
            Juuri.Kerros = false; Juuri.pickingMode = PickingMode.Position;
            Juuri.style.height = StyleKeyword.Null; Juuri.style.scale = StyleKeyword.Null; Juuri.style.bottom = 8; Juuri.style.overflow = StyleKeyword.Null;
            Juuri.style.paddingLeft = 10; Juuri.style.paddingRight = 10; Juuri.style.paddingTop = 8; Juuri.style.paddingBottom = 6;
            ylarivi.style.display = DisplayStyle.Flex; saatimet.style.display = DisplayStyle.Flex;
            ylarivi.Add(Live); ylarivi.Add(Lukema);
            foreach (var m in new IssKytkimet.Kytkin[] { Nopeus, Pilvet, Vuodenaika, Vuorokausi, Kohde, Kuvaa, Sulku }) saatimet.Add(m);
            foreach (var m in moduulit)
            {
                m.Kerros = false;
                var ms = m.style;
                ms.position = StyleKeyword.Null; ms.left = StyleKeyword.Null; ms.top = StyleKeyword.Null; ms.height = StyleKeyword.Null;
                ms.display = StyleKeyword.Null; ms.minHeight = StyleKeyword.Null;
                if (m is IssKytkimet.Saadin sd) { sd.Otsikko.style.display = DisplayStyle.Flex; sd.Kilpi.style.display = DisplayStyle.None; }
            }
            Live.Nimi.style.display = DisplayStyle.Flex;
            Nopeus.style.width = 62; Pilvet.style.width = 62; Vuodenaika.style.width = 62; Vuorokausi.style.width = 62; Kohde.style.width = 62; Kuvaa.style.width = 62;
            Sulku.style.width = 52; Live.style.width = 44; Live.style.height = 36; Lukema.style.width = StyleKeyword.Null; Lukema.style.marginLeft = 6;
            if (valoRt != null) { valoRt.Release(); UnityEngine.Object.Destroy(valoRt); valoRt = null; }
            asettelu = null;
            nyky = default;
            Lukema.VainRivi1 = false;
        }

        /// <summary>Liikkuvien osien kehykset ja valopainot tilasta; valosumma piirretään vain painojen muuttuessa.</summary>
        void PaivitaKerrokset()
        {
            string a = asettelu;
            if (osat.TryGetValue(Nopeus, out var on))
                AsetaKuva(on, IssPaneeliKuvat.Kuva(a, "osa-nopeus-" + Mathf.Clamp(Nopeus.Asento, 0, 3)));
            foreach (var n in new[] { Pilvet, Vuodenaika, Vuorokausi })
                if (osat.TryGetValue(n, out var e)) AsetaKuva(e, IssPaneeliKuvat.Kuva(a, "osa-nuppi-" + IssPaneeliKuvat.NupinKehys(n.Kulma).ToString("00")));
            if (osat.TryGetValue(Kohde, out var ok)) AsetaKuva(ok, IssPaneeliKuvat.Kuva(a, Kohde.Painettu ? "osa-kohde-alas" : "osa-kohde-ylos"));
            if (osat.TryGetValue(Sulku, out var os)) AsetaKuva(os, IssPaneeliKuvat.Kuva(a, Sulku.Painettu ? "osa-poistu-alas" : "osa-poistu-ylos"));
            if (osat.TryGetValue(Kuvaa, out var ov)) AsetaKuva(ov, IssPaneeliKuvat.Kuva(a, Kuvaa.Painettu ? "osa-kuvaa-alas" : "osa-kuvaa-ylos"));

            // Legendojen taustavalo: valkoinen LIVE:nä, meripihka nopeutettuna (PALAA).
            bool meri = Live.Meripihka;
            var ik0 = ikkunat[0];
            if (ik0 != null && (legendaMeripihka != meri || ik0.legendat.style.backgroundImage.keyword == StyleKeyword.Null))
            {
                legendaMeripihka = meri;
                var t = IssPaneeliKuvat.Kuva(a, meri ? "valo-legendat-meripihka" : "valo-legendat-valkoinen");
                foreach (var ik in ikkunat) AsetaKuva(ik.legendat, t);
            }
            // Lukeman rivien määrä voi muuttua (ylilento): fonttikoot.
            PaivitaTekstit();

            bool live = Live.Tila == IssKytkimet.Tila.Aktiivinen;
            float Nappi(IssKytkimet.Painike p) => p.Tila == IssKytkimet.Tila.Pois ? 0f : p.Painettu || p.Tila == IssKytkimet.Tila.Aktiivinen ? 1f : LepoValo;
            var uA = new Vector4(1f, live && !meri ? 1f : 0f, live && meri ? 1f : 0f, Nappi(Kohde));
            var uB = new Vector4(Nappi(Sulku), Nappi(Kuvaa), 0f, 0f);
            if (uA == painotA && uB == painotB && valoRt != null && valoRt.IsCreated()) return;
            painotA = uA; painotB = uB;
            PiirraValot();
        }

        void PiirraValot()
        {
            Texture2D mitta = null;
            foreach (var n in ValoJarjestys) { mitta = IssPaneeliKuvat.Kuva(asettelu, "valo-" + n); if (mitta != null) break; }
            if (mitta == null || ikkunat[0] == null) return;
            if (valoMat == null)
            {
                var sh = Resources.Load<Shader>("Varjostimet/IssValot");
                if (sh == null) { Debug.LogWarning("MATKAKIRJA iss-paneeli: IssValot-varjostin puuttuu"); return; }
                valoMat = new Material(sh) { name = "IssValot", hideFlags = HideFlags.HideAndDontSave };
            }
            // Valokerrokset ovat jo puolikokoisia (ryhmän kokoisina): RT samaan kokoon.
            int w = mitta.width, h = mitta.height;
            if (valoRt == null || valoRt.width != w || valoRt.height != h || !valoRt.IsCreated())
            {
                if (valoRt != null) { valoRt.Release(); UnityEngine.Object.Destroy(valoRt); }
                valoRt = new RenderTexture(new RenderTextureDescriptor(w, h, UnityEngine.Experimental.Rendering.GraphicsFormat.R8G8B8A8_SRGB, 0)
                    { useMipMap = false, autoGenerateMips = false })
                    { name = "IssValot", filterMode = FilterMode.Bilinear, wrapMode = TextureWrapMode.Clamp, hideFlags = HideFlags.HideAndDontSave };
                valoRt.Create();
                foreach (var ik in ikkunat) ik.valot.style.backgroundImage = new StyleBackground(Background.FromRenderTexture(valoRt));
            }
            var pa = painotA; var pb = painotB;
            for (int i = 0; i < ValoJarjestys.Length; i++)
            {
                var t = IssPaneeliKuvat.Kuva(asettelu, "valo-" + ValoJarjestys[i]);
                valoMat.SetTexture("_Valo" + i, t != null ? t : Texture2D.blackTexture);
                if (t == null) { if (i < 4) pa[i] = 0; else pb[i - 4] = 0; }
            }
            valoMat.SetVector("_PainotA", pa); valoMat.SetVector("_PainotB", pb);
            Graphics.Blit(null, valoRt, valoMat);
            foreach (var ik in ikkunat) ik.valot.MarkDirtyRepaint();
            Piirretty++;
        }

        /// <summary>Valosumman piirtokerrat (testikomento: todistaa, ettei piirretä joka ruutu).</summary>
        public int Piirretty { get; private set; }

        // ---------------- Pieni ja suuri tila (omistaja 2.10. 21.3x kohta 8) ----------------
        /// <summary>Suuri tila (säätimet luettavina); pieni = vain mittaririvi. Pieni on oletus kyydin avautuessa.</summary>
        public bool Suuri { get; private set; }
        /// <summary>Pieni ↔ suuri -liuku käynnissä.</summary>
        public bool Liukuu => ajo != null && ajo.isActive;
        /// <summary>Tila vaihtui (liu'un alussa): kyytinäkymä sulkee kohdelistan pienentyessä.</summary>
        public event Action<bool> SuuriMuuttui;
        /// <summary>Liuku päättyi tai asento asetettiin: pulu ja kohdelista seuraavat pöydän uutta yläreunaa.</summary>
        public event Action KokoMuuttui;
        /// <summary>Ohinapautus ei pienennä, kun tämä on tosi (kohdelista auki: napautus listan ohi sulkee vain listan).</summary>
        public Func<bool> EstaPienennys;

        /// <summary>Tekstien tavoitekoko ruudulla (pt, Päätoimittaja: iPhonella vähintään noin 11 pt).</summary>
        public const float TekstiPt = 11f;
        /// <summary>Suuren tilan skaala enintään (noin 2 ×) ja pienen tilan skaala osuutena entisestä (30.9.) pöydän skaalasta.</summary>
        const float SuuriEnintaan = 2f, PieniOsuus = 0.55f;
        /// <summary>Paneelin peitto enintään (UI kevyt: 45 % ruudun korkeudesta, Tyylikirja.Peitto.Max).</summary>
        const float PeittoEnintaan = Tyylikirja.Peitto.Max / 100f;
        /// <summary>Pohjan 9-slice (pt): yläreuna (läpinäkyvä + viiste, piilossa mittarin takana) ja säleikkö alhaalla.</summary>
        const float PohjaYla = 46f, PohjaAla = 40f;
        /// <summary>Säleikkökaista ikkunoiden alla (ryhmän pt) ennen alareunan turvaväliä.</summary>
        const float RaitaPt = 8f;

        Rect alueM, alueL, alueR;
        Vector2 ryhmaKoko;
        float yRaja, xRaja, sarake = 54f, lukemaKorkeus = 19.32f;
        bool kaksiRivia;

        /// <summary>Ryhmäkuvan jako (sprites.json-ankkureista): mittari kuvun yläreunasta otsikkorivin yläpuolelle, säädinryhmät
        /// siitä kuvun alareunaan, vasen ja oikea VUOROKAUSI- ja KOHDE-moduulien puolivälistä (kehysten välinen tumma rako).</summary>
        void LaskeAlueet(string a, Vector2 g)
        {
            ryhmaKoko = g;
            var kupu = IssPaneeliKuvat.Osa(a, "kupu") ?? new Rect(6f, 3f, g.x - 12f, g.y - 40f);
            var ot = IssPaneeliKuvat.Osa(a, "nopeus-otsikko");
            var lu = IssPaneeliKuvat.Osa(a, "lukema");
            var no = IssPaneeliKuvat.Osa(a, "nopeus");
            yRaja = ot.HasValue ? ot.Value.yMin + 1.5f : lu.HasValue && no.HasValue ? (lu.Value.yMax + no.Value.yMin) * 0.5f : g.y * 0.3f;
            var vk = IssPaneeliKuvat.Osa(a, "vuorokausi"); var ko = IssPaneeliKuvat.Osa(a, "kohde");
            xRaja = vk.HasValue && ko.HasValue ? (vk.Value.center.x + ko.Value.center.x) * 0.5f : g.x * 0.57f;
            var pi = IssPaneeliKuvat.Osa(a, "pilvet");
            if (no.HasValue && pi.HasValue) sarake = pi.Value.center.x - no.Value.center.x;
            if (lu.HasValue) lukemaKorkeus = lu.Value.height;
            float ala = Mathf.Min(g.y, kupu.yMax + 2f);
            alueM = Rect.MinMaxRect(kupu.xMin, kupu.yMin, kupu.xMax, yRaja);
            alueL = Rect.MinMaxRect(kupu.xMin, yRaja, xRaja, ala);
            alueR = Rect.MinMaxRect(xRaja, yRaja, kupu.xMax, ala);
        }

        /// <summary>Ankkurin ikkuna: 0 mittari, 1 vasen, 2 oikea.</summary>
        int Palaan(Vector2 keski) => keski.y < yRaja ? 0 : keski.x < xRaja ? 1 : 2;

        struct Pala
        {
            public float x, y, s, a;
            public Pala(float x, float y, float s, float a) { this.x = x; this.y = y; this.s = s; this.a = a; }
            public static Pala Lerp(Pala p, Pala q, float t) =>
                new Pala(Mathf.Lerp(p.x, q.x, t), Mathf.Lerp(p.y, q.y, t), Mathf.Lerp(p.s, q.s, t), Mathf.Lerp(p.a, q.a, t));
        }

        /// <summary>Pöydän asento Juuren koordinaateissa (pt, yläreunasta): ikkunat, pohja ja Juuren korkeus (sis. alareunan turvavälin).</summary>
        struct Asento
        {
            public Pala m, l, r;
            public Rect taso;
            public float tasoS, korkeus;
            public static Asento Lerp(Asento p, Asento q, float t) => new Asento
            {
                m = Pala.Lerp(p.m, q.m, t), l = Pala.Lerp(p.l, q.l, t), r = Pala.Lerp(p.r, q.r, t),
                taso = new Rect(Vector2.Lerp(p.taso.position, q.taso.position, t), Vector2.Lerp(p.taso.size, q.taso.size, t)),
                tasoS = Mathf.Lerp(p.tasoS, q.tasoS, t), korkeus = Mathf.Lerp(p.korkeus, q.korkeus, t),
            };
        }

        Asento nyky, lahto;
        float liukuAlku;
        IVisualElementScheduledItem ajo;

        /// <summary>
        /// Tilan asento ruudusta. PIENI: mittari 0,55 × entinen skaala (iPhone ja iPad ×0,55). SUURI: kaksi riviä (mittari, vasen, oikea
        /// allekkain; säätimet enintään 2 × ja ruudun levyisinä, mittari enintään ruudun levyinen) tai yksi rivi (ryhmä kuten ennen,
        /// enintään 2 ×); molemmissa koko pöytä ≤ 45 % ruudun korkeudesta. Kaksi riviä vain, jos säätimet tulevat selvästi isommiksi.
        /// </summary>
        Asento Laske(bool suuri)
        {
            float W = poytaLeveys, A = alaReuna, vapaa = Mathf.Max(1f, W - 16f);
            float raja = VaakaRajaus && RuudunKorkeus > 1f ? PeittoEnintaan * RuudunKorkeus : 1e6f;
            if (!suuri)
            {
                // 55 % entisestä (30.9.) koosta, jossa ryhmä sai ylittää ruudun 8 pt kummaltakin puolelta: iPhonella ×0,55.
                return Yksi(PieniOsuus * Mathf.Min(1f, W / (ryhmaKoko.x - 16f)), W, A, true);
            }
            float y0 = alueM.yMin;
            float s1 = Mathf.Min(SuuriEnintaan, vapaa / alueM.width, (raja - A) / (y0 + alueM.height + alueL.height + RaitaPt));
            float s2 = Mathf.Min(SuuriEnintaan, vapaa / alueL.width, vapaa / alueR.width);
            float sm = Mathf.Min(s2, vapaa / alueM.width);
            if ((y0 + alueM.height) * sm + (2f * alueL.height + RaitaPt) * s2 + A > raja)
            {
                s2 = (raja - A - (y0 + alueM.height) * sm) / (2f * alueL.height + RaitaPt);
                if (sm > s2) sm = s2 = (raja - A) / (y0 + alueM.height + 2f * alueL.height + RaitaPt);
            }
            s1 = Mathf.Max(0.3f, s1); s2 = Mathf.Max(0.3f, s2); sm = Mathf.Max(0.3f, sm);
            kaksiRivia = s2 > s1 + 0.05f;
            return kaksiRivia ? Kaksi(s2, sm, W, A) : Yksi(s1, W, A, false);
        }

        /// <summary>Yksi rivi: mittari ja sen alla vasen + oikea vierekkäin (ryhmä kuten kuvassa). Pieni: vain mittari, säätimet
        /// mittarin alla näkymättöminä (liu'un lähtökohta).</summary>
        Asento Yksi(float s, float W, float A, bool vainMittari)
        {
            var a = new Asento { tasoS = s };
            float x0 = (W - alueM.width * s) * 0.5f;
            a.m = new Pala(x0, alueM.yMin * s, s, 1f);
            float y = a.m.y + alueM.height * s;
            float n = vainMittari ? 0f : 1f;
            a.l = new Pala(x0 + (alueL.xMin - alueM.xMin) * s, y, s, n);
            a.r = new Pala(x0 + (alueR.xMin - alueM.xMin) * s, y, s, n);
            float ala = vainMittari ? y : y + alueL.height * s;
            a.korkeus = Mathf.Max(ala + RaitaPt * s + A, (PohjaYla + PohjaAla) * s + 1f);
            a.taso = TasoRect(x0 - alueM.xMin * s, ryhmaKoko.x * s, a.korkeus, W);
            return a;
        }

        /// <summary>Kaksi riviä: mittari (skaala sm), vasen (4 moduulia) ja oikea (3) allekkain keskitettyinä (skaala s).</summary>
        Asento Kaksi(float s, float sm, float W, float A)
        {
            var a = new Asento { tasoS = sm };
            a.m = new Pala((W - alueM.width * sm) * 0.5f, alueM.yMin * sm, sm, 1f);
            float y = a.m.y + alueM.height * sm;
            a.l = new Pala((W - alueL.width * s) * 0.5f, y, s, 1f);
            a.r = new Pala((W - alueR.width * s) * 0.5f, y + alueL.height * s, s, 1f);
            a.korkeus = Mathf.Max(a.r.y + alueR.height * s + RaitaPt * s + A, (PohjaYla + PohjaAla) * sm + 1f);
            float lev = Mathf.Max(alueM.width * sm, Mathf.Max(alueL.width, alueR.width) * s) + 2f * alueM.xMin * sm;
            a.taso = TasoRect((W - lev) * 0.5f, lev, a.korkeus, W);
            return a;
        }

        /// <summary>Pohja ikkunoiden takana; A/B sivulevyt = koko turva-alueen leveydeltä.</summary>
        static Rect TasoRect(float x, float leveys, float korkeus, float W) =>
            Sivulevyt ? new Rect(Mathf.Min(0f, x), 0f, Mathf.Max(W, leveys), korkeus) : new Rect(x, 0f, leveys, korkeus);

        /// <summary>Asento näkyviin: Juuri (turva-alueen levyinen, alareunan turvavälin yli), pohja ja ikkunat; tekstikoot skaalasta.</summary>
        void Nayta(Asento a)
        {
            if (taso == null || ikkunat[0] == null) return;
            nyky = a;
            var js = Juuri.style;
            js.left = 0; js.width = poytaLeveys; js.height = a.korkeus; js.bottom = -alaReuna;
            float ts = Mathf.Max(a.tasoS, 0.01f);
            var t = taso.style;
            t.left = a.taso.x; t.top = a.taso.y; t.width = a.taso.width / ts; t.height = a.taso.height / ts;
            t.scale = new Scale(new Vector3(ts, ts, 1f));
            AsetaPala(ikkunat[0], a.m); AsetaPala(ikkunat[1], a.l); AsetaPala(ikkunat[2], a.r);
            PaivitaTekstit();
        }

        static void AsetaPala(Ikkuna ik, Pala p)
        {
            var s = ik.rajaus.style;
            s.left = p.x; s.top = p.y; s.scale = new Scale(new Vector3(p.s, p.s, 1f)); s.opacity = p.a;
            s.display = p.a > 0.001f ? DisplayStyle.Flex : DisplayStyle.None;
        }

        /// <summary>Pieni ↔ suuri, liukuen 240 ms (Tyylikirja.Kesto.Liuku) tai heti (kyydin avaus, testikomento).</summary>
        public void AsetaSuuri(bool suuri, bool animoi = true)
        {
            bool muuttui = suuri != Suuri;
            Suuri = suuri;
            Lukema.VainRivi1 = !suuri && asettelu != null;   // kehystilassa (ei kerroksia) ei pientä tilaa
            if (muuttui) SuuriMuuttui?.Invoke(suuri);
            if (asettelu == null || !(poytaLeveys > 0f) || poytaLeveys > 1e5f) return;
            if (!animoi || nyky.tasoS <= 0f)
            {
                ajo?.Pause();
                Nayta(Laske(suuri));
                KokoMuuttui?.Invoke();
                return;
            }
            if (!muuttui) return;
            lahto = nyky;
            liukuAlku = Time.realtimeSinceStartup;
            Matkakirja.Ruudunpaivitys.Herata(Tyylikirja.Kesto.Liuku / 1000f + 0.1f);
            if (ajo == null) ajo = Juuri.schedule.Execute(Askel).Every(16);
            else ajo.Resume();
        }

        void Askel()
        {
            float t = Mathf.Clamp01((Time.realtimeSinceStartup - liukuAlku) * 1000f / Tyylikirja.Kesto.Liuku);
            float e = 1f - (1f - t) * (1f - t) * (1f - t);   // hidastuu loppua kohti
            Nayta(Asento.Lerp(lahto, Laske(Suuri), e));
            if (t < 1f) return;
            ajo.Pause();
            KokoMuuttui?.Invoke();
        }

        VisualElement kuuntelija;

        void Liita(VisualElement puu)
        {
            kuuntelija?.UnregisterCallback<PointerDownEvent>(Napautus, TrickleDown.TrickleDown);
            kuuntelija = puu;
            kuuntelija?.RegisterCallback<PointerDownEvent>(Napautus, TrickleDown.TrickleDown);
        }

        /// <summary>
        /// Paneelin juuressa ennen muita: pienen pöydän napautus vain suurentaa (StopPropagation: LIVE-valo tai vanhentunut kohde
        /// ei saa painallusta); suuren ohi napautus pienentää eikä niele kosketusta (kartan veto ja muut napit toimivat).
        /// Kohde ratkaistaan sijainnista, ei e.targetista (UITK:n kosketusvälimuisti voi antaa vanhan kohteen).
        /// </summary>
        void Napautus(PointerDownEvent e)
        {
            if (asettelu == null || !Nakyvissa()) return;
            bool sisalla = Sisaltaa(e.position);
            if (!Suuri)
            {
                if (!sisalla) return;
                AsetaSuuri(true);
                e.StopPropagation();
                return;
            }
            if (!sisalla && !(EstaPienennys?.Invoke() ?? false)) AsetaSuuri(false);
        }

        /// <summary>Osuuko paneelin piste (worldBound-koordinaatit) pöytään: pohja tai näkyvä ikkuna.</summary>
        public bool Sisaltaa(Vector2 piste)
        {
            if (taso != null && taso.worldBound.Contains(piste)) return true;
            foreach (var ik in ikkunat)
                if (ik != null && ik.rajaus.resolvedStyle.display != DisplayStyle.None && ik.rajaus.worldBound.Contains(piste)) return true;
            return false;
        }

        bool Nakyvissa()
        {
            if (Juuri.panel == null) return false;
            for (VisualElement v = Juuri; v != null; v = v.parent)
                if (v.resolvedStyle.display == DisplayStyle.None) return false;
            return true;
        }

        /// <summary>Testikomennon `astro kyyti paneeli tila` rivi: tila, molempien tilojen mitat ja tekstikoot ruudulla.</summary>
        public string TilaRivi()
        {
            if (asettelu == null) return $"pöytä {(Suuri ? "suuri" : "pieni")}: ei kerroksia (kehystila, ei pientä tilaa)";
            var p = Laske(false); var s = Laske(true);
            float H = RuudunKorkeus;
            string Mitta(Asento a) => $"{a.taso.width:0} × {a.korkeus - alaReuna:0} pt + turvaväli {alaReuna:0}, peitto {(H > 1f ? a.korkeus / H * 100f : 0f):0.0} %";
            var (r1, _) = LukemaPt(s.m.s, false);
            var (pr1, _) = LukemaPt(p.m.s, false);
            return $"pöytä {(Suuri ? "suuri" : "pieni")}{(ajo != null && ajo.isActive ? " (liukuu)" : "")}, turva-alue {poytaLeveys:0} × {H:0}, asettelu {asettelu}; "
                 + $"PIENI {Mitta(p)}, mittari ×{p.m.s:0.00}, lukema {pr1 * p.m.s:0.0} pt; "
                 + $"SUURI {(kaksiRivia ? "kaksi riviä" : "yksi rivi")} {Mitta(s)}, mittari ×{s.m.s:0.00} (lukema {r1 * s.m.s:0.0} pt), "
                 + $"säätimet ×{s.l.s:0.00} (kilpi 7 merkkiä {KilpiPt(7, s.l.s) * s.l.s:0.0} pt, otsikot kuvassa {7.73f * s.l.s:0.0} pt laatikko)";
        }
    }
}
