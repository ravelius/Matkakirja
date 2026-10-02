// AJATTELIJAT-LINSSIN NATIIVI-UI (Linssiseppä 2, 2.10.2026; web js/linssit/ajattelijat.js ja js/linssit/ajattelija.js, pinta
// css/pohjat/pinnat/ajattelija.css → Pohjat/Pinnat/ajattelija.uss). Tila tulee AjattelijatSovittimelta (staattinen malli
// kuten DioraamaTaulu ja DioraamaSovitin):
//   VALINTA   AukiNyt && Valittu == null: KORTTI-pohja (Kortti pohja: true) himmennyksellä, nappi per ajattelija → Valitse;
//             himmennyksen napautus ja Esc → PyydaSulku (web luoPohjaKortti ei-modaali, sulje ilman valintaa → poistu).
//   KUVA      Valittu != null: KUVANÄKYMÄ-pohja, teema tumma; AjattelijaNayttamo.NykyinenKuva koko ruudulle (Latautuu: vain
//             tumma pinta). ✕ lämmintä lasia (tk-teema-lasi), veto alas ja Esc → PyydaSulku.
//   TEKSTIT   nimi (NimiRivit versaalina) ja vuodet, kysymys, lähderivi (kreikka ja viite); peitot joka ruutu Tekstit-arvoista.
//   LOPUSSA   elämä-lappu NOSTOKORTTI-pohjalla, teema tumma (paikka ja vetokahva kuten IhmisenNostokortti, ei ✕:ää) ja PULU:
//             minipulu oikeassa alakulmassa → PuluChat.AvaaLinssissa (teema lasi). Kulma väistää lapun (
//             puhelimessa 8 pt lapun yläpuolelle, sivukortilla lapun vasemmalle, web #3857). Lappu ja PULU ovat valinnaisia (Elama / PulunKysymykset tyhjä → ei näy).
// Kerros: Ylakerros (37) kuten Kuvanakyma ja IssKyytiNakyma (KUVANÄKYMÄ-pohjat): koko ruudun näkymä peittää linssiselitteen
// ja taikalasit (25) sekä kulman Pulun (35); Pulun chat nousee linssitilassa näkymän päälle (UiNakymat.ChatinKerros).
// LinssiUi:n "Sulje linssi" on piilossa linssin ajan (Peittaa → LinssiUi.PaivitaSulku), koska ✕ ja kortti sulkevat.
// Testikomennot (UiKomennot): ui ajattelija tila | valitse <n> | pulu | sulje.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Matkakirja.Linssit.Ajattelijat;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class AjattelijaNakyma
    {
        /// <summary>Veto alas sulkee (web POHJA_VETO_PX 40: dy &gt; 2 × 40 ja dy &gt; 2 × |dx|).</summary>
        const float VetoRaja = 2f * Vetokahva.Alas;

        readonly UiKerros kerros;
        readonly VisualElement juuri, kuva, turva, nimiLohko, lahde, lappu, pulukulma, pulunappi, valinta;
        readonly Kortti kortti;
        readonly VisualElement korttiNapit;
        readonly Label nimi, vuodet, kysymys, kreikka, viite;
        readonly Button sulku;
        readonly ScrollView lapunVieritys;
        readonly Vetokahva kahva;
        readonly LiviaKuva minipulu;
        readonly List<Button> valintaNapit = new List<Button>();

        /// <summary>Ajattelija, jonka tekstit ja lappu on täytetty.</summary>
        AjattelijaData naytetty;
        bool kuvaAuki, valintaAuki, lappuAuki, lappuSuljettu, laajennettu, puluPiilotettu, peittaa;
        float nimiPeitto = -1f, kysymysPeitto = -1f, lahdePeitto = -1f;
        int vetoId = -1;
        Vector2 vetoAlku;

        /// <summary>Linssi auki (valinta tai kohtaus): LinssiUi piilottaa "Sulje linssi" -pillerin.</summary>
        public event Action<bool> Peittaa;

        static PuluChat Chat => UiNakymat.Olemassa ? UiNakymat.Hae().Chat : null;
        static bool ChatAuki => Chat != null && Chat.Auki && Chat.Linssissa;

        public AjattelijaNakyma(UiKerros kerros)
        {
            this.kerros = kerros;
            var koti = kerros.Juuri(LinssiUi.Ylakerros);

            // ── VALINTA: KORTTI-pohja (Vahvistus- ja MitaUutta-malli), himmennys ottaa kosketukset.
            valinta = Rakenne.El("mk-himmennys mk-himmennys--tumma", koti);
            valinta.style.display = DisplayStyle.None;
            valinta.RegisterCallback<PointerDownEvent>(e => { if (e.target == valinta) AjattelijatSovitin.PyydaSulku(); });
            kortti = new Kortti("mk-ajattelija-valinta", pohja: true);
            valinta.Add(kortti);
            Kirjasimet.Aseta(Rakenne.Teksti("Ajattelijat", "mk-kortti__kapiteeli", kortti.Sisus), Tyylikirja.Kirjain.Kapiteeli);
            Kirjasimet.Aseta(Rakenne.Teksti("Kenen ajatteluun tutustut?", "mk-kortti__otsikko", kortti.Sisus), Tyylikirja.Kirjain.Otsikko);
            Kirjasimet.Aseta(Rakenne.Teksti("Kehitysvaihe: näkyy vain kehittäjätilassa.", "mk-kortti__teksti", kortti.Sisus), Tyylikirja.Kirjain.Leipa);
            korttiNapit = Rakenne.El("mk-kortti__napit", kortti.Sisus, PickingMode.Ignore);
            Kirjasimet.Aseta(korttiNapit, Kirjasin.Kone);

            // ── KUVA: KUVANÄKYMÄ-pohja, teema tumma; näyttämön kuva koko ruudulle, ottaa kosketukset (veto alas).
            juuri = Rakenne.El("mk-ajattelija tk-teema-tumma", koti);
            juuri.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(juuri, Kirjasin.Luku);
            kuva = Rakenne.El("mk-ajattelija__kuva", juuri);
            kuva.RegisterCallback<PointerDownEvent>(e => { vetoId = e.pointerId; vetoAlku = e.position; });
            kuva.RegisterCallback<PointerUpEvent>(VetoLoppui);
            kuva.RegisterCallback<PointerCancelEvent>(_ => vetoId = -1);
            AjattelijaNayttamo.KuvaVaihtui += AsetaKuva;
            AsetaKuva(AjattelijaNayttamo.NykyinenKuva);

            // Nimi ja vuodet, kysymys: koko ruudun koordinaateissa (web .ajattelija-teksti left 6 %, top 42 %).
            nimiLohko = Rakenne.El("mk-ajattelija__teksti mk-ajattelija__nimilohko", juuri, PickingMode.Ignore);
            nimi = Rakenne.Teksti("", "mk-ajattelija__nimi", nimiLohko);
            Kirjasimet.Aseta(nimi, Kirjasin.Luku);
            vuodet = Rakenne.Teksti("", "mk-ajattelija__vuodet", nimiLohko);
            Kirjasimet.Aseta(vuodet, Kirjasin.LukuKursiivi);
            kysymys = Rakenne.Teksti("", "mk-ajattelija__teksti mk-ajattelija__kysymys", juuri);
            Kirjasimet.Aseta(kysymys, Kirjasin.LukuKursiivi);

            // Turva-alueen sisällä: lähderivi, lappu, PULU ja ✕ (Kuvanakyma.AsetaTurva: linssikerroksen reunat).
            turva = Rakenne.El("mk-ajattelija__turva", juuri, PickingMode.Ignore);
            kerros.TurvaMuuttui += AsetaTurva;
            AsetaTurva();

            lahde = Rakenne.El("mk-ajattelija__lahde", turva, PickingMode.Ignore);
            kreikka = Rakenne.Teksti("", "mk-ajattelija__kreikka", lahde);
            Kirjasimet.Aseta(kreikka, Kirjasin.Luku);
            viite = Rakenne.Teksti("", "mk-ajattelija__viite", lahde);
            Kirjasimet.Aseta(viite, Kirjasin.LukuKursiivi);

            // Elämä-lappu: NOSTOKORTTI-pohja, teema tumma; vetokahva (KAPEA) sulkee, ei ✕:ää.
            lappu = Rakenne.El("mk-ajattelija-lappu tk-teema-tumma", turva);
            lappu.style.display = DisplayStyle.None;
            lapunVieritys = new ScrollView(ScrollViewMode.Vertical);
            lapunVieritys.AddToClassList("mk-ajattelija-lappu__vieritys");
            lapunVieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            lapunVieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            lappu.Add(lapunVieritys);
            kahva = new Vetokahva(lappu, l => { laajennettu = l; Paikka(); }, () => SuljeLappu(true), () => laajennettu);
            lappu.RegisterCallback<GeometryChangedEvent>(_ => AsetaPulunKorkeus());

            // PULU: minipulu oikeassa alakulmassa (web .tk-pulukulma), napautus avaa Pulun chatin linssitilassa.
            pulukulma = Rakenne.El("mk-ajattelija__pulu", turva, PickingMode.Ignore);
            pulukulma.style.display = DisplayStyle.None;
            pulunappi = Rakenne.El("mk-ajattelija__pulunappi", pulukulma);
            minipulu = new LiviaKuva(mini: true);
            pulunappi.Add(minipulu);
            pulunappi.RegisterCallback<PointerDownEvent>(e => { e.StopPropagation(); PuluNapautettu(); });

            sulku = Rakenne.Nappi("×", "mk-kuvanakyma__sulku tk-teema-lasi", /* KUVANÄKYMÄ-pohja: ✕ lämmin lasi */
                AjattelijatSovitin.PyydaSulku, turva);
            sulku.tooltip = "Sulje";

            turva.RegisterCallback<GeometryChangedEvent>(e =>
            {
                float w = e.newRect.width, h = e.newRect.height;
                if (float.IsNaN(w) || float.IsNaN(h) || w <= 0 || h <= 0) return;
                // Web minipulu koko 'auto': 84 pt, pieni ruutu (≤ 620 × 500) 56 pt (Kuvanakyma).
                minipulu.MiniKorkeus(w <= 620f || h <= 500f ? 56f : 84f);
                Paikka();
            });

            // Esc: lappu ensin (NOSTOKORTTI, kuten ihmisnosto 60), sitten koko linssi (valinta tai kohtaus).
            Nappaimisto.Rekisteroi("ajattelija-lappu", 60, () => lappuAuki, null, null, () => SuljeLappu(true));
            Nappaimisto.Rekisteroi("ajattelija", 58, () => AjattelijatSovitin.AukiNyt, null, null, AjattelijatSovitin.PyydaSulku);

            AjattelijatSovitin.Muuttui += Kytke;
            kerros.JokaRuutu += Paivita;
            Kytke();
        }

        // ── Tila sovittimelta ─────────────────────────────────────────────────────────────────

        /// <summary>AjattelijatSovitin.Muuttui: avaus, sulku, valinta, lataus valmis tai lopetus.</summary>
        void Kytke()
        {
            bool auki = AjattelijatSovitin.AukiNyt;
            var a = auki ? AjattelijatSovitin.Valittu : null;

            bool valintaNakyy = auki && a == null;
            if (valintaNakyy != valintaAuki)
            {
                valintaAuki = valintaNakyy;
                if (valintaNakyy) RakennaValinta();
                Rakenne.Nayta(valinta, valintaNakyy, valintaNakyy ? 320 : 250);
                SyoteLukko.Aseta(this, valintaNakyy);
            }

            if (a != naytetty)
            {
                naytetty = a;
                lappuSuljettu = false;
                SuljeLappu(false);
                if (ChatAuki) Chat.Sulje();
                if (a != null) Tayta(a);
            }
            bool kuvaNakyy = a != null;
            if (kuvaNakyy != kuvaAuki)
            {
                kuvaAuki = kuvaNakyy;
                vetoId = -1;
                if (kuvaNakyy) Ponnahdus.Avaa(juuri); else Ponnahdus.Sulje(juuri);
            }
            // Lataus: vain tumma pinta (näyttämön kuva voi olla edellisen kohtauksen tai musta).
            kuva.style.display = a != null && !AjattelijatSovitin.Latautuu ? DisplayStyle.Flex : DisplayStyle.None;

            bool lopussa = a != null && AjattelijatSovitin.Lopussa;
            if (lopussa && !lappuAuki && !lappuSuljettu && a.Elama.Count > 0) AvaaLappu();
            if (!lopussa) SuljeLappu(false);
            bool pulu = lopussa && a.PulunKysymykset.Count > 0;
            pulukulma.style.display = pulu ? DisplayStyle.Flex : DisplayStyle.None;
            if (!pulu && ChatAuki) Chat.Sulje();
            AsetaPulunKorkeus();

            // Kulman Pulu piiloon linssin ajaksi (DioraamaTaulu.Kytke): kohtauksessa oma minipulu, eikä kulman Pulu saa nousta
            // chatin mukana kerrokseen 42 näkymän päälle.
            var p = Pulu.Hae();
            if (auki && p.Nakyvissa) { p.Nayta(false); puluPiilotettu = true; }
            else if (!auki && puluPiilotettu) { p.Nayta(true); puluPiilotettu = false; }
            if (!auki && ChatAuki) Chat.Sulje();

            if (auki != peittaa) { peittaa = auki; Peittaa?.Invoke(auki); }
        }

        /// <summary>Valinnan napit sovittimen listasta (uusi ajattelija = uusi data, ei koodimuutosta).</summary>
        void RakennaValinta()
        {
            korttiNapit.Clear();
            valintaNapit.Clear();
            foreach (var a in AjattelijatSovitin.Ajattelijat)
            {
                string tunnus = a.Tunnus;
                var b = Rakenne.Nappi(a.Nimi, "mk-nappi--toiminto", () => AjattelijatSovitin.Valitse(tunnus), korttiNapit);
                Kirjasimet.Aseta(b, Kirjasin.KoneLihava);
                valintaNapit.Add(b);
            }
            // KORTTI-pohja: yli kaksi nappia allekkain koko leveydelle (web tk-napit--pysty).
            korttiNapit.EnableInClassList("mk-kortti__napit--pysty", valintaNapit.Count > 2);
        }

        /// <summary>Tekstit ja lappu ajattelijan datasta (web avaaAjattelija: nimi, vuodet, kysymys, lähde).</summary>
        void Tayta(AjattelijaData a)
        {
            // Versaali ja rivit kuten webin text-transform: uppercase ja <br> (UI Toolkitissa ei text-transformia).
            nimi.text = string.Join("\n", a.NimiRivit.Select(r => (r ?? "").ToUpperInvariant()));
            vuodet.text = a.Vuodet ?? "";
            kysymys.text = a.Kysymys ?? "";
            kreikka.text = a.Paalause?.El ?? "";
            viite.text = a.Paalause?.Viite ?? "";
            nimiPeitto = kysymysPeitto = lahdePeitto = -1f;
            AsetaPeitot(default);

            var s = lapunVieritys.contentContainer;
            s.Clear();
            lapunVieritys.scrollOffset = Vector2.zero;
            if (a.Elama.Count == 0) return;
            Kirjasimet.Aseta(Rakenne.Teksti((a.Nimi ?? "").ToUpperInvariant(), "mk-ajattelija-lappu__yla", s),
                Tyylikirja.Kirjain.Kapiteeli);
            Kirjasimet.Aseta(Rakenne.Teksti(a.ElamaOtsikko ?? "", "mk-ajattelija-lappu__otsikko", s), Tyylikirja.Kirjain.Otsikko);
            foreach (var k in a.Elama)
            {
                if (!string.IsNullOrEmpty(k.Otsikko))
                    Kirjasimet.Aseta(Rakenne.Teksti(k.Otsikko, "mk-ajattelija-lappu__valiotsikko", s), Tyylikirja.Kirjain.Valiotsikko);
                Kirjasimet.Aseta(Rakenne.Teksti(k.Teksti ?? "", "mk-ajattelija-lappu__teksti", s), Tyylikirja.Kirjain.Leipa);
            }
        }

        /// <summary>Joka ruutu: tekstien peitot aikajanalta (AjattelijatSovitin.Tekstit).</summary>
        void Paivita()
        {
            if (!kuvaAuki || naytetty == null) return;
            AsetaPeitot(AjattelijatSovitin.Latautuu ? default : AjattelijatSovitin.Tekstit);
        }

        void AsetaPeitot(AjattelijaTekstit t)
        {
            // Vain muuttunut arvo (tyylin kirjoitus likaa asettelun joka ruutu muuten turhaan).
            if (!Mathf.Approximately(t.Nimi, nimiPeitto)) { nimiPeitto = t.Nimi; nimiLohko.style.opacity = Mathf.Clamp01(t.Nimi); }
            if (!Mathf.Approximately(t.Kysymys, kysymysPeitto)) { kysymysPeitto = t.Kysymys; kysymys.style.opacity = Mathf.Clamp01(t.Kysymys); }
            if (!Mathf.Approximately(t.Lahde, lahdePeitto)) { lahdePeitto = t.Lahde; lahde.style.opacity = Mathf.Clamp01(t.Lahde); }
        }

        void AsetaKuva(RenderTexture rt)
        {
            kuva.style.backgroundImage = rt != null ? new StyleBackground(Background.FromRenderTexture(rt)) : new StyleBackground(StyleKeyword.None);
        }

        void AsetaTurva()
        {
            // Kuvanakyma.AsetaTurva: Ylakerroksella ei ole omaa turva-aluetta; sama ruutu, joten linssikerroksen reunat.
            var r = kerros.Reunat(LinssiUi.Kerros);
            turva.style.left = r.x; turva.style.top = r.y; turva.style.right = r.z; turva.style.bottom = r.w;
        }

        /// <summary>Veto alas kuvassa sulkee (KUVANÄKYMÄ-pohja; web pointerup dy &gt; 80 ja dy &gt; 2 |dx|).</summary>
        void VetoLoppui(PointerUpEvent e)
        {
            if (e.pointerId != vetoId) return;
            vetoId = -1;
            var d = (Vector2)e.position - vetoAlku;
            if (d.y > VetoRaja && d.y > 2f * Mathf.Abs(d.x)) AjattelijatSovitin.PyydaSulku();
        }

        // ── Elämä-lappu (NOSTOKORTTI tumma) ja PULU ────────────────────────────────────────────

        void AvaaLappu()
        {
            lappuAuki = true;
            laajennettu = false;
            lapunVieritys.scrollOffset = Vector2.zero;
            Paikka();
            Ponnahdus.Avaa(lappu);
            AsetaPulunKorkeus();
        }

        /// <summary>Lappu kiinni; kayttaja = vetokahva tai Esc (ei avaudu uudelleen tämän kohtauksen aikana).</summary>
        void SuljeLappu(bool kayttaja)
        {
            if (kayttaja) lappuSuljettu = true;
            if (!lappuAuki) return;
            lappuAuki = false;
            laajennettu = false;
            Ponnahdus.Sulje(lappu);
            AsetaPulunKorkeus();
        }

        /// <summary>
        /// NOSTOKORTTI-pohjan paikka (IhmisenNostokortti.Paikka): KAPEA alareunaan, korkeus enintään Peitto.Max % (laajennettuna
        /// Peitto.Laajennettu %), vetokahva näkyvissä; KESKI/LEVEÄ sivukortti oikeaan reunaan ✕:n alta alas (Pohja.Sivukortti).
        /// </summary>
        void Paikka()
        {
            float W = turva.layout.width, H = turva.layout.height, m = Tyylikirja.Vali.M;
            if (float.IsNaN(W) || float.IsNaN(H) || W <= 0 || H <= 0) return;
            // Yläraja ✕:n alle (KUVANÄKYMÄ: ✕ vali-m + osuma 44 pt turva-alueen yläreunasta); ei yläpalkkia tässä näkymässä.
            float yla = m + Tyylikirja.Nappi.Osuma + m;
            bool kapea = Pohja.Leveys(W) == Pohja.Luokka.Kapea;
            var s = lappu.style;
            if (kapea)
            {
                s.left = m; s.right = m; s.width = StyleKeyword.Auto;
                s.top = StyleKeyword.Auto; s.bottom = m;
                s.maxHeight = Mathf.Round(Mathf.Min(H - yla - m, H * (laajennettu ? Tyylikirja.Peitto.Laajennettu : Tyylikirja.Peitto.Max) / 100f));
            }
            else
            {
                s.left = StyleKeyword.Auto; s.right = m; s.width = Pohja.Sivukortti(W);
                s.top = yla; s.bottom = StyleKeyword.Auto;
                s.maxHeight = Mathf.Round(H - yla - m);
            }
            kahva.Juuri.style.display = kapea ? DisplayStyle.Flex : DisplayStyle.None;
            AsetaPulunKorkeus();
        }

        /// <summary>
        /// Pulu lapun ollessa auki (web #3857 lapunVahti): sivukortilla (vasen reuna yli 25 % leveydestä) kulma siirtyy kortin
        /// vasemmalle puolelle (right = näkymän oikea − kortin vasen + 12), ettei se osu ✕:n päälle; puhelimessa 8 pt kortin
        /// yläreunan yläpuolelle. Kiinni: USS:n kulma.
        /// </summary>
        void AsetaPulunKorkeus()
        {
            float W = turva.layout.width, H = turva.layout.height, x = lappu.layout.x, y = lappu.layout.y;
            if (lappuAuki && !float.IsNaN(W) && !float.IsNaN(H) && !float.IsNaN(y) && H > 0 && lappu.layout.height > 0)
            {
                if (x > 0.25f * W)
                {
                    pulukulma.style.bottom = StyleKeyword.Null;
                    pulukulma.style.right = Mathf.Round(W - x + 12f);
                }
                else
                {
                    pulukulma.style.bottom = Mathf.Round(H - y + 8f);
                    pulukulma.style.right = StyleKeyword.Null;
                }
            }
            else
            {
                pulukulma.style.bottom = StyleKeyword.Null;
                pulukulma.style.right = StyleKeyword.Null;
            }
        }

        void PuluNapautettu()
        {
            var a = naytetty;
            var c = Chat;
            if (a == null || c == null || a.PulunKysymykset.Count == 0) return;
            Aanet.PulunTehoste("pulu.kujerrus");
            if (ChatAuki) { c.Sulje(); return; }
            // PULU-pohja, osa CHAT (web luoPohjaPulu teema 'lasi'): lämmin lasi, chat minipulun yläpuolelle.
            c.AvaaLinssissa(() => pulukulma.worldBound, "ajattelija:" + a.Tunnus, a.PulunKysymykset, "lasi");
        }

        // ── Testikomennot (UiKomennot: ui ajattelija …) ──────────────────────────────────────────

        /// <summary>ui ajattelija tila | valitse &lt;n&gt; (1 = ensimmäinen nappi) | pulu | sulje.</summary>
        public string Komento(string loput)
        {
            var o = (loput ?? "").Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            string mita = o.Length > 0 ? o[0] : "tila";
            switch (mita)
            {
                case "tila":
                    return Tila();
                case "valitse":
                {
                    if (o.Length < 2 || !int.TryParse(o[1], out int n)) return "ui ajattelija valitse <n>";
                    if (!valintaAuki) return Kirjaa("valinta ei ole auki");
                    if (n < 1 || n > valintaNapit.Count) return Kirjaa($"ei nappia {n} ({valintaNapit.Count} nappia)");
                    return Kirjaa("painettu " + Paina(valintaNapit[n - 1]));
                }
                case "pulu":
                    if (pulukulma.resolvedStyle.display == DisplayStyle.None) return Kirjaa("Pulu ei ole näkyvissä");
                    PuluNapautettu();
                    return Kirjaa("Pulu napautettu, chat " + (ChatAuki ? "auki" : "kiinni"));
                case "sulje":
                    if (!kuvaAuki) return Kirjaa("✕ ei ole näkyvissä");
                    return Kirjaa("painettu " + Paina(sulku));
                default:
                    return "ui ajattelija tila | valitse <n> | pulu | sulje";
            }
        }

        static string Paina(Button b)
        {
            using (var e = NavigationSubmitEvent.GetPooled()) { e.target = b; b.SendEvent(e); }
            return b.Q<Label>(className: "mk-nappi__teksti")?.text ?? b.name;
        }

        static string Kirjaa(string teksti)
        {
            Debug.Log("MATKAKIRJA ui ajattelija: " + teksti);
            return teksti;
        }

        /// <summary>Näkyvät osat ja niiden worldBoundit lokiin (yksi rivi per osa).</summary>
        string Tila()
        {
            var a = AjattelijatSovitin.Valittu;
            Kirjaa($"auki {AjattelijatSovitin.AukiNyt}, valittu {a?.Tunnus ?? "-"}, latautuu {AjattelijatSovitin.Latautuu}, "
                + $"lopussa {AjattelijatSovitin.Lopussa}, kuva {(AjattelijaNayttamo.NykyinenKuva != null ? "on" : "ei")}, chat {(ChatAuki ? "auki" : "kiinni")}, "
                + $"peitot nimi {nimiPeitto:0.00} kysymys {kysymysPeitto:0.00} lähde {lahdePeitto:0.00}");
            int n = 0;
            void Osa(string nimiTeksti, VisualElement e)
            {
                if (!Rakenne.Naytetaan(e)) return;
                n++;
                var r = e.worldBound;
                Kirjaa(string.Format(CultureInfo.InvariantCulture, "{0}: x {1:0} y {2:0} w {3:0} h {4:0}, peitto {5:0.00}",
                    nimiTeksti, r.x, r.y, r.width, r.height, e.resolvedStyle.opacity));
            }
            Osa("valinta", kortti);
            for (int i = 0; i < valintaNapit.Count; i++) Osa($"valinta nappi {i + 1}", valintaNapit[i]);
            Osa("kuva", kuva);
            Osa("nimi", nimiLohko);
            Osa("kysymys", kysymys);
            Osa("lähde", lahde);
            Osa("✕", sulku);
            Osa("lappu", lappu);
            Osa("pulu", pulunappi);
            return $"{n} näkyvää osaa";
        }
    }
}
