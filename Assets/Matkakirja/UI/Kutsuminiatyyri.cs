// AVAUSKORTIN KUTSU: MINIATYYRI KAUPUNGIN VIERESSÄ (Natiivi-UI; omistaja 27.9.2026 klo 23.4x, web v2296
// js/pallolauta/lauta.js paivitaKaupunkikortinKutsu, css/styles.css .kaupunkikortin-kutsu).
//
// Saapuessa mikään ei avaudu itsestään, joten pelaajan kaupungin ja nappulan viereen tulee pieni kortti (herokuva +
// nimi, 64 × 64 pt), joka napautettaessa kasvaa avauskortiksi (Avauskortti, 280 ms) ja sulkeutuessa palaa samaan
// paikkaan. Paikka väistää nostojen merkit, kaupungin pisteen ja nappulan sekä ruudun kalusteet (yläpalkki,
// matkakirjan paikkarivi, Pulu, Liiku); asennot etäisyysrenkaittain, kussakin yläoikea → ylävasen → oikea → vasen →
// alaoikea (web KUTSUN_ASENNOT). Omistaja 27.9. klo 11.2x: kutsu lähemmäs kaupunkia — renkaat 8, 20, 36 pt (web 16–100),
// ja kun nostot (täytenä nimineen, maailma auki) peittävät kaikki, toinen kierros väistää vain kalusteet, kaupungin
// pisteen ja nappulan (kutsu saa peittää nostomerkin). Ei mahdu mihinkään → ei kutsua. Piilossa, kun kamera on maatasoa
// kauempana (NostoKerros.ZoomKerroin < 0,95), linssissä, muussa tilassa kuin kartalla ja avauskortin ollessa auki.
// Kaupungilla pitää olla nähtävyyskartta tai turisti-info (web kaupungillaKohdekartta || kaupunginMatkailijalle).
//
// VAKAA ANKKURI (omistajan löydös 1.0.32, Ateena: kortti vaihtoi paikkaa ja välkkyi): paikka valitaan kerran kaupunkia
// kohden (renkaat ja asennot kuten yllä) ja lukitaan kaupungin pisteeseen kiinteällä siirrolla; kortti ei enää koskaan
// vaihda asentoa. Lukittuna esteinä ovat vain kalusteet, kaupungin piste, nappula ja ruudun reuna (ei nostomerkit, jotka
// syttyvät ja sammuvat omien sääntöjensä mukaan). Peitossa kortti piiloutuu paikallaan hystereesillä: piiloon, kun
// peitto on kestänyt PiiloS, ja takaisin, kun paikka on ollut vapaana (vara Vara pt) PiiloS. Uusi kaupunki = uusi valinta.
//
// Ulkoasu (web): reuna 2 px #f5f0e2, kulma 9, pohja #d9ccb0, kuva cover; nimi alareunassa Luku lihava 10 pt #fff8ec
// pohjalla rgba(33,29,24,.72), yksi rivi. Esiin 350 ms (scale 0,85 → 1, opacity 0 → 1); vähennetty liike: heti.
using System.Collections.Generic;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Kutsuminiatyyri
    {
        public const float Koko = 64f;
        /// <summary>Web KUTSUN_KERROIN: nostojen karttakerroin, jonka alla kutsu on piilossa.</summary>
        const float Kerroin = 0.95f;
        const float Reunavara = 4f, EsiinMs = 350f;
        /// <summary>Piilotuksen ja paluun hystereesi: peiton/vapauden kesto (s) ja paluun lisävara (pt).</summary>
        const float PiiloS = 0.4f, Vara = 6f;
        static readonly float[] Renkaat = { 8f, 20f, 36f };

        readonly UiKerros kerros;
        readonly VisualElement juuri, kuva;
        readonly Button nappi;
        readonly Label nimi;
        readonly List<Rect> esteet = new List<Rect>();
        readonly Dictionary<string, bool> kutsuttavat = new Dictionary<string, bool>();
        PalloKierto kierto;
        string kaupunki, kuvanTiedosto;
        float esiinAlku = float.NaN;
        bool nakyy;
        /// <summary>Lukittu siirto kaupungin pisteestä (vasen yläkulma), tai null = ei vielä valittu tälle kaupungille.</summary>
        Vector2? lukittu;
        /// <summary>Lukittu paikka peitossa (piilossa peiton takia; muut piilotussyyt eivät viivästä paluuta).</summary>
        bool peitossa;
        /// <summary>Hetki, josta alkaen peiton vastainen tila on jatkunut; NaN = ei muutosta vireillä.</summary>
        float muutosAlkoi = float.NaN;

        public Kutsuminiatyyri(UiKerros kerros)
        {
            this.kerros = kerros;
            juuri = Rakenne.El("mk-kutsu", kerros.Juuri(UiKerros.Nostot), PickingMode.Ignore);
            nappi = Rakenne.Nappi(null, "mk-kutsu__kortti", Avaa, juuri);
            nappi.style.transformOrigin = new TransformOrigin(Length.Percent(50), Length.Percent(50));
            kuva = Rakenne.El("mk-kutsu__kuva", nappi, PickingMode.Ignore);
            nimi = Rakenne.Teksti("", "mk-kutsu__nimi", nappi);
            Kirjasimet.Aseta(nimi, Kirjasin.LukuLihava);
            nappi.style.display = DisplayStyle.None;
            kerros.JokaRuutu += Paivita;
        }

        /// <summary>Kutsu näkyvissä (testikomento).</summary>
        public bool Nakyy => nakyy;
        public Rect Laatikko => nakyy ? nappi.worldBound : default;

        void Nayta(bool b)
        {
            if (b == nakyy) return;
            nakyy = b;
            nappi.style.display = b ? DisplayStyle.Flex : DisplayStyle.None;
            if (b)
            {
                bool liike = !LinssiUi.VahennettyLiike();
                esiinAlku = liike ? -1f : float.NaN;
                nappi.style.opacity = liike ? 0f : 1f;
                nappi.style.scale = liike ? new Scale(new Vector3(0.85f, 0.85f, 1f)) : (StyleScale)StyleKeyword.Null;
            }
        }

        void Paivita()
        {
            var ui = UiNakymat.Hae();
            var o = PeliOhjain.Instanssi;
            string id = o != null && o.Kaytossa && o.Tila == SilmukanTila.Kartta ? o.PelaajanKaupunki : null;
            if (ui == null || id == null || ui.Linssit?.Auki != null || ui.Kaupunkikortti.Nakyvissa || !Kutsuttava(id)
                || !(ui.Nostot.Karttakerroin >= Kerroin))
            { Nayta(false); return; }
            var k = UiSisalto.Kaupunki(id);
            if (k == null) { Nayta(false); return; }
            if (kaupunki != id)
            {
                kaupunki = id;
                lukittu = null;
                peitossa = false;
                muutosAlkoi = float.NaN;
                nimi.text = k.Nimi ?? id;
                kuva.style.backgroundImage = StyleKeyword.None;
                kuvanTiedosto = null;
                // Herokuva tulee kaupunkilehden avauskuvista; aloituskaupungissa lehteä ei ole vielä pyydetty
                // (EsilataaSaapuminen ajetaan vain lennolla), joten kutsu jäi pelkäksi pohjaksi.
                UiSisalto.LataaLehti(id);
            }
            string tiedosto = Avauskortti.HeroTiedosto(k);
            if (tiedosto != null && tiedosto != kuvanTiedosto)
            {
                kuvanTiedosto = tiedosto;
                Kuvat.Hae(tiedosto, tex => { if (tex != null && kuvanTiedosto == tiedosto) kuva.style.backgroundImage = new StyleBackground(tex); });
            }
            if (kierto == null) kierto = Object.FindAnyObjectByType<PalloKierto>();
            if (kierto == null || juuri.panel == null || !kierto.RuutuPiste(k.Lat, k.Lon, out var r)) { Nayta(false); return; }
            var p = juuri.WorldToLocal(RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(r.x, Screen.height - r.y)));
            float W = juuri.layout.width, H = juuri.layout.height;
            if (float.IsNaN(W) || W <= 0) { Nayta(false); return; }

            // Esteet paneelin koordinaateissa: nostojen merkit, kalusteet, kaupungin piste ja nappula (n. 44 pt ylös).
            // Kaikki laatikot paneelin maailmakoordinaateissa (worldBound); omat paikalliset + juuren kulma.
            var paikallinen = juuri.worldBound.position;
            esteet.Clear();
            ui.Nostot.Laatikot(esteet);
            int nostoja = esteet.Count;
            float ylapalkki = kerros.Reunat(UiKerros.Nostot).y + Ylapalkki.Varaus;
            esteet.Add(new Rect(paikallinen, new Vector2(W, ylapalkki)));
            if (ui.Matkakirja != null && ui.Matkakirja.Nakyy) esteet.Add(ui.Matkakirja.Laatikko);
            esteet.Add(ui.Pulu.Laatikko);
            esteet.Add(ui.Matkavalinta.LiikuLaatikko);
            esteet.Add(new Rect(paikallinen + new Vector2(p.x - 14f, p.y - 46f), new Vector2(28f, 56f)));
            // Lukittu paikka: sama siirto kaupungin pisteestä; vain kalusteet, piste, nappula ja reuna voivat peittää.
            if (lukittu.HasValue)
            {
                var rr = new Rect(p.x + lukittu.Value.x, p.y + lukittu.Value.y, Koko, Koko + 14f);
                // Näkyvä piiloutuu vasta selvästä peitosta (PiiloS), peitossa oleva palaa vain varan kanssa ja viiveellä.
                bool vapaa = Vapaa(rr, peitossa ? Vara : 0f, nostoja, W, H, paikallinen);
                float nyt = Time.unscaledTime;
                if (vapaa != peitossa) muutosAlkoi = float.NaN;
                else if (float.IsNaN(muutosAlkoi)) muutosAlkoi = nyt;
                if (!float.IsNaN(muutosAlkoi) && nyt - muutosAlkoi >= PiiloS) { peitossa = !vapaa; muutosAlkoi = float.NaN; }
                // Vireillä oleva muutos tarvitsee piirron, jotta se ratkeaa levossakin.
                if (!float.IsNaN(muutosAlkoi)) Ruudunpaivitys.Herata(0.1f);
                Aseta(rr);
                if (peitossa) { Nayta(false); return; }
            }
            else
            {
                Rect? valittu = null;
                for (int kierros = 0; kierros < 2 && !valittu.HasValue; kierros++)
                {
                    foreach (var r0 in Renkaat)
                    {
                        foreach (var a in new[]
                        {
                            new Vector2(r0, -r0 - Koko), new Vector2(-r0 - Koko, -r0 - Koko),
                            new Vector2(r0 + 4f, -Koko / 2f), new Vector2(-r0 - 4f - Koko, -Koko / 2f), new Vector2(r0, r0),
                        })
                        {
                            var rr = new Rect(p.x + a.x, p.y + a.y, Koko, Koko + 14f);
                            if (!Vapaa(rr, 0f, kierros == 0 ? 0 : nostoja, W, H, paikallinen)) continue;
                            valittu = rr;
                            lukittu = a;
                            break;
                        }
                        if (valittu.HasValue) break;
                    }
                }
                if (!valittu.HasValue) { Nayta(false); return; }
                Aseta(valittu.Value);
            }
            Nayta(true);
            Animoi();
        }

        /// <summary>Laatikko ruudun sisällä ja vapaa esteistä alkaen indeksistä ensimmainen (vara laajentaa laatikkoa).</summary>
        bool Vapaa(Rect rr, float vara, int ensimmainen, float W, float H, Vector2 paikallinen)
        {
            var r = new Rect(rr.x - vara, rr.y - vara, rr.width + 2f * vara, rr.height + 2f * vara);
            if (r.xMin < Reunavara || r.yMin < Reunavara || r.xMax > W - Reunavara || r.yMax > H - Reunavara) return false;
            var maailma = new Rect(r.position + paikallinen, r.size);
            for (int i = ensimmainen; i < esteet.Count; i++)
            {
                var e = esteet[i];
                if (e.width > 0 && e.height > 0 && e.Overlaps(maailma)) return false;
            }
            return true;
        }

        void Aseta(Rect rr)
        {
            float x = Mathf.Round(rr.x), y = Mathf.Round(rr.y);
            if (nappi.resolvedStyle.left != x) nappi.style.left = x;
            if (nappi.resolvedStyle.top != y) nappi.style.top = y;
        }

        void Animoi()
        {
            if (float.IsNaN(esiinAlku)) return;
            float nyt = Time.unscaledTime * 1000f;
            if (esiinAlku < 0f) esiinAlku = nyt;
            float s = Mathf.Clamp01((nyt - esiinAlku) / EsiinMs);
            float e = 1f - (1f - s) * (1f - s);
            nappi.style.opacity = e;
            float sk = Mathf.Lerp(0.85f, 1f, e);
            nappi.style.scale = new Scale(new Vector3(sk, sk, 1f));
            Ruudunpaivitys.Herata(0.1f);
            if (s < 1f) return;
            esiinAlku = float.NaN;
            nappi.style.opacity = StyleKeyword.Null;
            nappi.style.scale = StyleKeyword.Null;
        }

        /// <summary>Web: kaupungilla nähtävyyskartta tai turisti-info. Oppaan tieto haetaan kerran taustalla.</summary>
        bool Kutsuttava(string id)
        {
            if (Kohdekartat.On(id)) return true;
            if (!Kohdekartat.Ladattu) Kohdekartat.Hae(id, _ => { });
            if (kutsuttavat.TryGetValue(id, out var b)) return b;
            kutsuttavat[id] = false;
            LehtiSisalto.HaeOpas(id, opas => kutsuttavat[id] = opas != null);
            return false;
        }

        /// <summary>Napautus: kortti kasvaa tämän paikalta (PeliOhjain.AvaaKortti → Avauskortti.Nayta).</summary>
        void Avaa()
        {
            var ui = UiNakymat.Hae();
            if (ui == null || kaupunki == null) return;
            Aanet.PulunTehoste("paper");
            ui.Kaupunkikortti.SeuraavaLahde = nappi.worldBound;
            var o = PeliOhjain.Instanssi;
            string virhe = o != null ? o.AvaaKortti(kaupunki) : "peli ei ole käynnissä";
            if (virhe != null)
            {
                ui.Kaupunkikortti.SeuraavaLahde = null;
                Debug.Log("MATKAKIRJA ui kutsu: " + virhe);
            }
        }

        /// <summary>Testikomento: napauta kutsua (virhe tai null).</summary>
        public string Napauta()
        {
            if (!nakyy) return "kutsu ei ole näkyvissä";
            Avaa();
            return null;
        }
    }
}
