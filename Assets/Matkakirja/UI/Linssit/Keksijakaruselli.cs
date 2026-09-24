// KEKSIJÄKARUSELLI (Natiivi-UI): keksintölinssin muotokuvanauha alareunassa (web js/aikajana.js
// .aikajana-nauha, karusellinMitta/-Etaisyys/-Paikat/-Heitto/-Kohde/-VedonPaikka, kytkeKarusellinVeto,
// napautaKorttia; css/aikajana.css .aikajana-kortti).
//
// Kortti per pysäkki (hiljaiset pois): muotokuva 4:5 ylhäältä rajattuna ja henkilön nimi. Keskimmäinen
// on 1,45-kertainen kultareunalla, naapurit 0,62 → 0,52 → 0,44, väli kortin mittojen keskiarvo × 1,05.
// Menneet ovat teräviä ja himmeneviä, tulevat sumeita (valmiiksi sumennettu pieni kuva, ei suodatin).
// Kortti, joka ei mahdu kokonaan nauhalle, on piilossa (nykyinen näkyy aina).
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
            for (int i = 0; i < kortit.Count; i++)
            {
                var k = kortit[i];
                float ero = i - nyt, d = Mathf.Abs(ero), mitta = Mitta(d);
                float paikka = Mathf.Sign(ero) * Etaisyys(d);
                bool mahtuu = i == keski || Mathf.Abs(paikka) + mitta / 2f <= puolikas;
                bool nykyinen = i == keski, tuleva = !nykyinen && mahtuu && ero > 0, piilossa = !mahtuu;
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
                // Lähempänä keskustaa oleva peittää kauemman (web jarjestys 100 − d): piirtojärjestys sisaruksina.
                k.Tuleva = tuleva;
                if (!piilossa) Lataa(k);
                NaytaKuva(k);
            }
            // Piirtojärjestys: kaukaisimmat ensin, keskimmäinen viimeisenä.
            var jarjestys = new List<Kortti>(kortit);
            jarjestys.Sort((a, b) => Mathf.Abs(kortit.IndexOf(b) - nyt).CompareTo(Mathf.Abs(kortit.IndexOf(a) - nyt)));
            foreach (var k in jarjestys) k.El.BringToFront();
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
                try { kortti.Sumea = Kuvat.Pienenna(t, SumeaL, SumeaK); } catch (Exception) { kortti.Sumea = t; }
                NaytaKuva(kortti);
            }, "kuvat");
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
