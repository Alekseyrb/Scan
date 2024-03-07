import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
  size: 1000, // максимальное количество ключей, по умолчанию 1000
  storageBackend: AsyncStorage, // используйте AsyncStorage для RN приложений
  defaultExpires: 1000 * 3600 * 24*14, // время истечения по умолчанию: 24 часа
  enableCache: true, // кэширование данных в памяти, по умолчанию true
  sync: {
    // синхронизация данных
  }
});

export default storage;