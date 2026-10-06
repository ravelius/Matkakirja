// PCM-VIRTA (Pelikoodari + Linssiseppä 5.10.2026, juna 145; Päätoimittajan valinta: alle 6 s toiveesta ääneen, William v4): Pöllö
// virtaa ElevenLabsin pcm_24000:n raakana (s16le, mono, chunked). Unityn iOS-MP3-striimi ei toiminut (TF 1.0.29), joten tavut luetaan
// itse: DownloadHandlerScript kerää näytteet kasvavaan puskuriin (lukko vain indekseille), ja AudioClip.Create(stream: true) lukee ne
// PCMReaderCallbackissa äänisäikeessä. Alivuodossa callback antaa hiljaisuutta (katko kirjataan). Pariton tavu siirtyy seuraavaan
// pakettiin. Loppu = lataus valmis ja kaikki luettu.
// MUKAUTUVA PUSKURI (omistaja TF 149: "lukijan teksti jää kesken" ja "ääni katkeilee alussa"; Linssisepän toisto 6.10. 16.4x:
// ElevenLabs virtaa lähes reaaliajassa → alivuotoja, ja kiinteän pituinen klippi kului hiljaisuuteen ennen kuin kaikki oli soitettu,
// joten kertoja vaikeni kesken ja kierros jäi odottamaan loppua). Nyt: klippi on pitkä (hiljaisuus ei katkaise), alivuodossa soitto
// pysähtyy (hiljaisuus) ja jatkuu vasta, kun puskurissa on UudelleenS (tai lataus on valmis), jotta katkoja tulee yksi eikä pätkintää.
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public sealed class PcmVirta : DownloadHandlerScript
    {
        readonly object lukko = new object();
        short[] data;
        int kirjoitettu, luettu, katkoja;
        long annettu, loppuKohta = -1;   // Unitylle annetut näytteet (data + hiljaisuus) ja kohta, jossa viimeinen datanäyte annettiin
        bool parittomia; byte pariton;
        bool alivuoto, puskuroi;
        /// <summary>Alivuodon jälkeen soitto jatkuu, kun puskurissa on näin paljon (s) tai lataus on valmis (Päätoimittaja: ~2 s).</summary>
        public const float UudelleenS = 2f;
        public readonly int Taajuus;
        public volatile bool Valmis;
        public volatile bool Virhe;

        public PcmVirta(int taajuus, float arvioS) : base(new byte[16384])
        {
            Taajuus = taajuus > 0 ? taajuus : 24000;
            data = new short[Mathf.Max(Taajuus * 4, (int)(Taajuus * (arvioS > 0 ? arvioS + 5 : 40)))];
        }

        protected override bool ReceiveData(byte[] tavut, int pituus)
        {
            if (tavut == null || pituus <= 0) return true;
            lock (lukko)
            {
                int i = 0;
                if (parittomia) { Lisaa((short)(pariton | (tavut[0] << 8))); i = 1; parittomia = false; }
                for (; i + 1 < pituus; i += 2) Lisaa((short)(tavut[i] | (tavut[i + 1] << 8)));
                if (i < pituus) { pariton = tavut[i]; parittomia = true; }
            }
            return true;
        }

        void Lisaa(short v)
        {
            if (kirjoitettu >= data.Length) System.Array.Resize(ref data, data.Length * 2);
            data[kirjoitettu++] = v;
        }

        protected override void CompleteContent() => Valmis = true;

        /// <summary>Puskuroitu, lukematon ääni sekunteina.</summary>
        public float PuskuroituS { get { lock (lukko) return (kirjoitettu - luettu) / (float)Taajuus; } }
        public float KirjoitettuS { get { lock (lukko) return kirjoitettu / (float)Taajuus; } }
        public bool Loppui { get { lock (lukko) return Valmis && luettu >= kirjoitettu; } }
        public int Katkoja => katkoja;

        /// <summary>
        /// SOITETTU LOPPUUN (simu 6.10. 17.0x: kierros lähti ~1,6 s ennen kerronnan loppua, koska Unity lukee virtaklippiä etukäteen
        /// eikä "kaikki luettu" tarkoita "kaikki kuultu"): klipin soittokohta (AudioSource.timeSamples) on ohittanut kohdan, jossa
        /// viimeinen datanäyte annettiin Unitylle.
        /// </summary>
        public bool SoitettuLoppuun(int soittokohta) { lock (lukko) return loppuKohta >= 0 && soittokohta >= loppuKohta; }

        /// <summary>AudioClipin PCMReaderCallback (äänisäie).</summary>
        public void Lue(float[] ulos)
        {
            lock (lukko)
            {
                // Uudelleenpuskurointi: hiljaisuutta, kunnes puskurissa on UudelleenS tai kaikki on ladattu.
                if (puskuroi && (Valmis || kirjoitettu - luettu >= (int)(UudelleenS * Taajuus))) puskuroi = false;
                bool vaje = false;
                for (int i = 0; i < ulos.Length; i++)
                {
                    if (!puskuroi && luettu < kirjoitettu) ulos[i] = data[luettu++] / 32768f;
                    else { ulos[i] = 0f; if (!puskuroi) vaje = true; }
                    annettu++;
                    if (loppuKohta < 0 && Valmis && luettu >= kirjoitettu) loppuKohta = annettu;
                }
                if (vaje && !Valmis && !alivuoto) { alivuoto = true; katkoja++; puskuroi = true; }
                else if (!vaje) alivuoto = false;
            }
        }

        /// <summary>Virtaava klippi (pituus yläraja; loppu tunnistetaan Loppui-arvosta). Pituus on reilusti yli arvion (3 × + 60 s),
        /// jotta alivuotojen hiljaisuus ei koskaan kuluta klippiä loppuun ennen kuin kaikki on soitettu.</summary>
        public AudioClip Klippi(string nimi, float arvioS)
        {
            int pituus = Mathf.Max(Taajuus * 120, (int)(Taajuus * ((arvioS > 0 ? arvioS : 40) * 3 + 60)));
            return AudioClip.Create(nimi, pituus, 1, Taajuus, true, Lue);
        }
    }
}
