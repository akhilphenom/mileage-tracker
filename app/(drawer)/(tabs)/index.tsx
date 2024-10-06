import ComposedSafeView from '@/components/safe-view-composed';
import UserIcon from '@/components/user-icon/user-icon';
import NoData from '@/app/(home)/no-data';
import useStore from '@/store/store';

export default function HomeScreen() {

  const conditionalRender = () => {
    const { users, currentUserId, getVehicleInsights } = useStore()
    const { vehicles } = users[currentUserId!];
    if(!vehicles.length) {
      return <NoData/>;
    } else {
      // const { } = getVehicleInsights();
    }
  }

  return (
    <ComposedSafeView>
      {conditionalRender()}
      <UserIcon/>
    </ComposedSafeView>
  );
}
