import React, { useState } from 'react';
import { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

const Welcome = () => {
    const [isRoomShown, setIsRoomShown] = useState(false);
    const [isExitShown, setIsExitShown] = useState(false);
    const currentPage = window.location.pathname;

    useEffect(() => {
        if (currentPage === '/lobby')
            setIsExitShown(true);
        if (currentPage === '/game') {
            setIsExitShown(true);
            setIsRoomShown(true);
        }
    }, [currentPage]);
	return (
        <Card className='header'>
            <Button className={'btn'} variant="link" href={'/'}>TETRIS</Button>
            <div className='menu'>
                { isRoomShown && <Button className={'header-link'} variant="link" href={'/lobby'}>ROOMS</Button>}
                { isExitShown && <Button className={'header-link'} variant="link" href={'/'}>EXIT</Button>}
            </div>
        </Card>
	);
}

export default Welcome;