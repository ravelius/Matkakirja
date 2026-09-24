// KEKSIJÄKARUSELLI (Natiivi-UI): keksintölinssin muotokuvanauha alareunassa (web js/aikajana.js
// .aikajana-nauha, karusellinMitta/-Etaisyys/-Paikat/-Heitto/-Kohde/-VedonPaikka, kytkeKarusellinVeto,
// napautaKorttia; css/aikajana.css .aikajana-kortti).
//
// Kortti per pysäkki (hiljaiset pois): muotokuva 4:5 ylhäältä rajattuna ja henkilön nimi. Keskimmäinen
// on 1,45-kertainen kultareunalla, naapurit 0,62 → 0,52 → 0,44, väli kortin mittojen keskiarvo × 1,05.
// Menneet ovat teräviä ja himmeneviä, tulevat sumeita (valmiiksi sumennettu pieni kuva, ei suodatin).
// Kortti, joka ei mahdu kokonaan nauhalle, on piilossa (nykyinen näkyy aina); reunan takaisia kauempana
// olevat ovat display: none, ja piirtojärjestystä korjataan vain keskimmäisen vaihtuessa (pysäkinvaihdon piikki).
//
// Veto: 8 px kynnyksen jälkeen nauha seuraa sormea (karusellinVedonPaikka) ilman siirtymää; irrotus heittää
// nopeuden mukaan enintään kolme korttia (0,18 s) ja asettuu lähimpään → Valittu (ajo.Siirry, jää tauolle).
// Napautus: keskimmäinen → Avaa (juttu), muu → Valittu.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Aikajana;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Keksijakaruselli
    {
        static readonly float[] Mitat = { 1.45f, 0.62f, 0.52f, 0.44f }; // web KARUSELLIN_MITAT
        const float Vali = 1.05f, Kynnys = 8f, HeitonAika = 0.18f, HeitonKatto = 3f;
        const int KuvaL = 240, KuvaK = 300, SumeaL = 24, SumeaK = 30;

        sealed class Kortti
        {
            public VisualElement El, Kuva;
            public int Pysakki;
            public string Osoite;
            public Texture2D Terava, Sumea;
            public bool Tuleva;
        }

        readonly VisualElement nauha;
        readonly List<Kortti> kortit = new List<Kortti>();
        float nyt;
        bool vetaa, painettu;
        int painettuKortti = -1, osoitin = -1;
        float alkuX, alkuNyt, viimeX, viimeAika, nopeus;

        /// <summary>Muu kuin keskimmäinen kortti napautettiin tai veto asettui: pysäkin indeksi.</summary>
        public event Action<int> Valittu;
        /// <summary>Keskimmäinen kortti napautettiin: pysäkin juttu auki.</summary>
        public event Action<int> Avaa;
        /// <summary>Veto alkoi (web aloitaSelaus + tauko).</summary>
        public event Action VetoAlkoi;

        public Keksijakaruselli(VisualElement isa)
        {
            nauha = Rakenne.El("mk-karuselli", isa, PickingMode.Ignore);
            nauha.style.display = DisplayStyle.None;
            nauha.RegisterCallback<GeometryChangedEvent>(_ => Asettele());
        }

        /// <summary>Kortin perusleveys (web --aikajana-kortti-w: clamp(84px, 13vw, 132px), puhelin clamp(92px, 25vw, 112px)).</summary>
        float Leveys
        {
            get
            {
                float w = nauha.resolvedStyle.width;
                if (float.IsNaN(w) || w <= 0) w = 800f;
                return w <= 600f ? Mathf.Clamp(w * 0.25f, 92f, 112f) : Mathf.Clamp(w * 0.13f, 84f, 132f);
            }
        }

        public void Rakenna(IReadOnlyList<Pysakki> pysakit)
        {
            nauha.Clear();
            kortit.Clear();
            jarjestettyKeski = -1;
            for (int i = 0; i < pysakit.Count; i++)
            {
                var p = pysakit[i];
                if (p.Hiljainen) continue;
                var k = new Kortti { Pysakki = i, Osoite = p.Kuva?.Osoite ?? p.Kuva?.Tiedosto };
                k.El = Rakenne.El(p.Paalu ? "mk-karuselli__kortti mk-karuselli__kortti--paalu" : "mk-karuselli__kortti", nauha);
                k.Kuva = Rakenne.El("mk-karuselli__kuva", k.El, PickingMode.Ignore);
                var nimi = Rakenne.Teksti(p.Henkilo ?? p.Otsikko ?? "", "mk-karuselli__nimi", k.El);
                nimi.pickingMode = PickingMode.Ignore;
                Kirjasimet.Aseta(nimi, Kirjasin.LukuKursiivi);
                int indeksi = kortit.Count;
                k.El.RegisterCallback<PointerDownEvent>(e => Alas(e, indeksi));
                k.El.RegisterCallback<PointerMoveEvent>(Liike);
                k.El.RegisterCallback<PointerUpEvent>(Ylos);
                k.El.RegisterCallback<PointerCaptureOutEvent>(_ => { if (vetaa || painettu) Irrota(false); });
                kortit.Add(k);
            }
            nauha.style.display = kortit.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            Asettele();
        }

        public void Nayta(bool nakyy) => nauha.style.display = nakyy && kortit.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;

        /// <summary>Pysäkki keskelle (ajo tai selaus).</summary>
        public void Aseta(int pysakki)
        {
            if (vetaa) return;
            int i = kortit.FindIndex(k => k.Pysakki >= pysakki);
            if (i < 0) i = kortit.Count - 1;
            if (i < 0 || Mathf.Approximately(nyt, i)) return;
            nyt = i;
            Asettele();
        }

        // --- asettelu (web karusellinPaikat, asettele) ------------------------------------------------

        static float Mitta(float d)
        {
            d = Mathf.Abs(d);
            int viimeinen = Mitat.Length - 1;
            if (d >= viimeinen) return Mitat[viimeinen];
            int k = Mathf.FloorToInt(d);
            return Mitat[k] + (Mitat[k + 1] - Mitat[k]) * (d - k);
        }

        static float Etaisyys(float d)
        {
            float matka = Mathf.Abs(d), x = 0;
            int kokonaiset = Mathf.FloorToInt(matka);
            for (int k = 1; k <= kokonaiset; k++) x += (Mitta(k - 1) + Mitta(k)) / 2f * Vali;
            float jaannos = matka - kokonaiset;
            if (jaannos > 0) x += (Mitta(kokonaiset) + Mitta(kokonaiset + 1)) / 2f * Vali * jaannos;
            return x;
        }

        static float EtaisyysKaanteinen(float x)
        {
            float matka = Mathf.Abs(x);
            if (!(matka > 0)) return 0;
            float kertyma = 0;
            int viimeinen = Mitat.Length - 1;
            for (int k = 1; k <= viimeinen; k++)
            {
                float askel = (Mitta(k - 1) + Mitta(k)) / 2f * Vali;
                if (kertyma + askel >= matka) return (k - 1) + (matka - kertyma) / askel;
                kertyma += askel;
            }
            return viimeinen + (matka - kertyma) / (Mitat[viimeinen] * Vali);
        }

        void Asettele()
        {
            if (kortit.Count == 0) return;
            float w = Leveys, leveys = nauha.resolvedStyle.width;
            float puolikas = Mathf.Max(1f, float.IsNaN(leveys) ? 1f : leveys / w) / 2f;
            int keski = Mathf.RoundToInt(nyt);
            // Nauhan korkeus: 1,45-kertainen kortti (kuva 4:5 + nimirivi) ja vähän väliä (web .aikajana-nauha).
            nauha.style.height = Mathf.Round((w * 1.25f + 26f) * Mitat[0] + 10f);
            // Näkyvät kortit ovat yhtenäinen väli keskimmäisen ympärillä (mitta pienenee etäisyyden mukaan).
            int eka = keski, vika = keski;
            while (eka > 0 && Mahtuu(eka - 1 - nyt, puolikas)) eka--;
            while (vika < kortit.Count - 1 && Mahtuu(vika + 1 - nyt, puolikas)) vika++;
            // Reunan takana yksi läpinäkyvä kortti kummallakin puolella, jotta tuleva kortti liukuu ja
            // häivyttyy sisään kuten webissä; muut ovat display: none eivätkä maksa asettelua eikä piirtoa.
            int alku = Mathf.Max(0, eka - 1), loppu = Mathf.Min(kortit.Count - 1, vika + 1);
            for (int i = 0; i < kortit.Count; i++)
            {
                var k = kortit[i];
                bool esilla = i >= alku && i <= loppu;
                k.El.style.display = esilla ? DisplayStyle.Flex : DisplayStyle.None;
                if (!esilla) { k.El.style.opacity = 0; continue; } // palatessaan häivyttyy nollasta
                float ero = i - nyt, d = Mathf.Abs(ero), mitta = Mitta(d);
                float paikka = Mathf.Sign(ero) * Etaisyys(d);
                bool nykyinen = i == keski, piilossa = i < eka || i > vika, tuleva = !nykyinen && !piilossa && ero > 0;
                float himmeys = 1f;
                if (ero < 0) himmeys = d < 1 ? 1 - 0.18f * d : Mathf.Max(0.4f, 0.82f - (d - 1) * 0.14f);
                else if (ero > 0) himmeys = d < 1 ? 1 - 0.1f * d : Mathf.Max(0.5f, 0.9f - (d - 1) * 0.12f);
                if (tuleva) himmeys *= 0.92f;
                if (piilossa) himmeys = 0;
                k.El.style.width = w;
                k.Kuva.style.height = Mathf.Round(w * 1.25f); // muotokuva 4:5
                k.El.style.translate = new Translate(paikka * w - w / 2f, 0);
                k.El.style.scale = new Scale(new Vector2(mitta, mitta));
                k.El.style.opacity = himmeys;
                k.El.pickingMode = piilossa ? PickingMode.Ignore : PickingMode.Position;
                k.El.EnableInClassList("mk-karuselli__kortti--nykyinen", nykyinen);
                k.Tuleva = tuleva;
                if (!piilossa) Lataa(k);
                NaytaKuva(k);
            }
            Jarjesta(keski);
        }

        bool Mahtuu(float ero, float puolikas) => Etaisyys(Mathf.Abs(ero)) + Mitta(ero) / 2f <= puolikas;

        int jarjestettyKeski = -1;
        readonly List<VisualElement> tavoite = new List<VisualElement>();

        /// <summary>
        /// Piirtojärjestys (web z-index 100 − d): lähempänä keskustaa oleva peittää kauemman. Päällekkäin menevät
        /// vain naapurit, joten riittää vasen puoli nousevana, oikea laskevana ja keskimmäinen viimeisenä. Järjestys
        /// vaihtuu vain keskimmäisen vaihtuessa, ja siirretään vain väärässä kohdassa olevat (tavallisesti yksi):
        /// jokainen siirto on hierarkian muutos, joka rakentaa elementin piirtodatan uudelleen.
        /// </summary>
        void Jarjesta(int keski)
        {
            if (keski == jarjestettyKeski && nauha.childCount == kortit.Count) return;
            jarjestettyKeski = keski;
            tavoite.Clear();
            for (int i = 0; i < keski; i++) tavoite.Add(kortit[i].El);
            for (int i = kortit.Count - 1; i > keski; i--) tavoite.Add(kortit[i].El);
            tavoite.Add(kortit[keski].El);
            for (int p = 0; p < tavoite.Count; p++)
            {
                var nykyinen = nauha[p];
                if (nykyinen == tavoite[p]) continue;
                // Jos tässä kohdassa oleva kortti on se, joka on väärässä paikassa (seuraava on jo oikea),
                // siirretään se omalle paikalleen; muuten tuodaan oikea kortti tähän.
                if (p + 1 < nauha.childCount && nauha[p + 1] == tavoite[p])
                {
                    int oma = tavoite.IndexOf(nykyinen);
                    nauha.Insert(oma, nykyinen);
                    if (nauha[p] != tavoite[p]) nauha.Insert(p, tavoite[p]);
                }
                else nauha.Insert(p, tavoite[p]);
            }
        }

        void Lataa(Kortti k)
        {
            if (k.Terava != null || string.IsNullOrEmpty(k.Osoite)) return;
            var kortti = k;
            // Muotokuva ylhäältä rajattuna (web object-position: center top); sumea pienestä versiosta.
            Kuvat.HaePienena(k.Osoite, KuvaL, KuvaK, 1f, t =>
            {
                if (t == null || kortti.Terava != null) return;
                kortti.Terava = t;
                kortti.Sumea = Sumenna(t) ?? t;
                NaytaKuva(kortti);
            }, "kuvat");
        }

        /// <summary>
        /// Sumea versio prosessorilla (lohkojen keskiarvo 240 × 300 → 24 × 30, näytetään venytettynä):
        /// ei GPU-luentaa pääsäikeessä. Vaatii luettavan tekstuurin (Kuvat.HaePienena).
        /// </summary>
        static Texture2D Sumenna(Texture2D t)
        {
            if (!t.isReadable) return null;
            var px = t.GetPixels32();
            int lx = t.width / SumeaL, ly = t.height / SumeaK;
            if (lx < 1 || ly < 1) return null;
            var ulos = new Color32[SumeaL * SumeaK];
            for (int y = 0; y < SumeaK; y++)
            for (int x = 0; x < SumeaL; x++)
            {
                int r = 0, g = 0, b = 0, a = 0;
                for (int yy = 0; yy < ly; yy++)
                for (int xx = 0; xx < lx; xx++)
                {
                    var c = px[(y * ly + yy) * t.width + x * lx + xx];
                    r += c.r; g += c.g; b += c.b; a += c.a;
                }
                int n = lx * ly;
                ulos[y * SumeaL + x] = new Color32((byte)(r / n), (byte)(g / n), (byte)(b / n), (byte)(a / n));
            }
            var s = new Texture2D(SumeaL, SumeaK, TextureFormat.RGBA32, false) { wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Bilinear };
            s.SetPixels32(ulos);
            s.Apply(false, true);
            return s;
        }

        static void NaytaKuva(Kortti k)
        {
            var t = k.Tuleva ? (k.Sumea ?? k.Terava) : k.Terava;
            k.Kuva.style.backgroundImage = t != null ? new StyleBackground(t) : new StyleBackground(StyleKeyword.None);
        }

        // --- veto ja napautus (web kytkeKarusellinVeto, napautaKorttia) ----------------------------

        void Alas(PointerDownEvent e, int indeksi)
        {
            if (painettu) return;
            painettu = true;
            vetaa = false;
            painettuKortti = indeksi;
            osoitin = e.pointerId;
            alkuX = viimeX = e.position.x;
            viimeAika = Time.unscaledTime;
            alkuNyt = nyt;
            nopeus = 0;
            kortit[indeksi].El.CapturePointer(e.pointerId);
            e.StopPropagation();
        }

        void Liike(PointerMoveEvent e)
        {
            if (!painettu || e.pointerId != osoitin) return;
            float dx = e.position.x - alkuX;
            if (!vetaa && Mathf.Abs(dx) > Kynnys)
            {
                vetaa = true;
                nauha.AddToClassList("mk-karuselli--vedossa");
                VetoAlkoi?.Invoke();
            }
            float t = Time.unscaledTime, dt = t - viimeAika;
            if (dt > 0.0001f) nopeus = Mathf.Lerp(nopeus, (e.position.x - viimeX) / dt, 0.6f);
            viimeX = e.position.x;
            viimeAika = t;
            if (!vetaa) return;
            float w = Leveys;
            float siirto = Mathf.Sign(dx) * EtaisyysKaanteinen(Mathf.Abs(dx) / w);
            nyt = Mathf.Clamp(alkuNyt - siirto, 0, kortit.Count - 1);
            Asettele();
            e.StopPropagation();
        }

        void Ylos(PointerUpEvent e)
        {
            if (!painettu || e.pointerId != osoitin) return;
            e.StopPropagation();
            Irrota(true);
        }

        void Irrota(bool valmis)
        {
            int kortti = painettuKortti;
            bool veto = vetaa;
            painettu = vetaa = false;
            painettuKortti = -1;
            if (kortti >= 0 && kortti < kortit.Count && kortit[kortti].El.HasPointerCapture(osoitin)) kortit[kortti].El.ReleasePointer(osoitin);
            nauha.RemoveFromClassList("mk-karuselli--vedossa");
            if (veto)
            {
                // Heitto korttien yksiköissä: sormi vasemmalle = eteenpäin (web karusellinHeitto, -Kohde).
                float heitto = Mathf.Clamp(-nopeus / Leveys * HeitonAika, -HeitonKatto, HeitonKatto);
                int kohde = Mathf.Clamp(Mathf.RoundToInt(nyt + heitto), 0, kortit.Count - 1);
                nyt = kohde;
                Asettele();
                if (valmis) Valittu?.Invoke(kortit[kohde].Pysakki);
                return;
            }
            if (!valmis || kortti < 0 || kortti >= kortit.Count) return;
            if (kortti == Mathf.RoundToInt(nyt)) Avaa?.Invoke(kortit[kortti].Pysakki);
            else { nyt = kortti; Asettele(); Valittu?.Invoke(kortit[kortti].Pysakki); }
        }
    }
}
