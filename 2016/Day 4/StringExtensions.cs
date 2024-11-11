namespace Day_4
{
    public static class StringExtensions
    {
        public static string CaesarCode(this string str, int cipherLength)
        {
            var shift = cipherLength % 26;
            var buffer = str.ToCharArray();

            for(var i = 0; i < buffer.Length; i++)
            {
                var letter = buffer[i];
                letter = (char) (letter + shift);

                if (letter > 'z')
                {
                    letter = (char) (letter - 26);
                }
                else if (letter < 'a')
                {
                    letter = (char) (letter + 26);
                }

                buffer[i] = letter;
            }

            return new string(buffer);
        }
    }
}
