import ComposedSafeView from '@/components/safe-view-composed';
import UserIcon from '@/components/user-icon/user-icon';
import NoData from '@/app/(home)/no-data';

export default function HomeScreen() {
  return (
    <ComposedSafeView>
      <NoData/>
      <UserIcon/>
    </ComposedSafeView>
  );
}
